import asyncio
import os
import shutil
import subprocess
import click
import datetime
import requests
import json
import sys

from time import sleep

import undetected_chromedriver as uc

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Only set meet_id if the script is run directly
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python gmeet.py <meeting_link> <meet_id>")
        sys.exit(1)
    meet_id = sys.argv[2]
else:
    meet_id = None

def make_request(url, headers, method="GET", data=None, files=None):
    if method == "POST":
        response = requests.post(url, headers=headers, json=data, files=files)
    else:
        response = requests.get(url, headers=headers)
    return response.json()


async def run_command_async(command):
    process = await asyncio.create_subprocess_shell(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    # Wait for the process to complete
    stdout, stderr = await process.communicate()

    return stdout, stderr


async def google_sign_in(email, password, driver):
    # Open the Google Sign-In page
    driver.get("https://accounts.google.com")

    sleep(1)
    # Find the email input field and enter the email
    email_field = driver.find_element(By.NAME, "identifier")
    email_field.send_keys(email)
    
    # Only save screenshot if meet_id is provided
    if meet_id:
        driver.save_screenshot(f"screenshots/{meet_id}/email.png")

    # Click the Next button
    sleep(2)
    driver.find_element(By.ID, "identifierNext").click()

    # Wait for a moment to let the next page load
    sleep(3)

    # Only save screenshot if meet_id is provided
    if meet_id:
        driver.save_screenshot(f"screenshots/{meet_id}/password.png")

    # Find the password input field and enter the password
    password_field = driver.find_element(By.NAME, "Passwd")
    password_field.click()
    password_field.send_keys(password)

    # Press the Enter key to submit the form
    password_field.send_keys(Keys.RETURN)

    # Wait for the login process to complete
    sleep(5)
    # save screenshot
    driver.save_screenshot(f"screenshots/{meet_id}/signed_in.png")


async def join_meet():
    meet_link = sys.argv[1]
    # meet_id = sys.argv[2]
    print(f"start recorder for {meet_link}")

    # # Check if the directory exists
    # if os.path.exists("screenshots"):
    #     # For each item in the directory, delete it
    #     for f in os.listdir("screenshots"):
    #         path = os.path.join("screenshots", f)
    #         if os.path.isfile(path):
    #             os.remove(path)  # Remove file
    #         elif os.path.isdir(path):
    #             shutil.rmtree(path)  # Remove directory
    # else:
    #     # Create the directory if it doesn't exist
    #     os.mkdir("screenshots")

    meet_screenshots_path = os.path.join("screenshots", meet_id)

    if os.path.exists(meet_screenshots_path):
        for item in os.listdir(meet_screenshots_path):
            item_path = os.path.join(meet_screenshots_path, item)
            try:
                if os.path.isfile(item_path) or os.path.islink(item_path):
                    os.remove(item_path)  # Remove file or symlink
                elif os.path.isdir(item_path):
                    shutil.rmtree(item_path)  # Remove folder and its contents
            except Exception as e:
                print(f"Failed to delete {item_path}: {e}")
    else:
        os.makedirs(meet_screenshots_path, exist_ok=True)

 # Replace your existing PulseAudio setup with this more robust version
    print("setting up audio system")
    # Clean previous PulseAudio setup
    subprocess.check_output(
        "sudo rm -rf /var/run/pulse /var/lib/pulse /root/.config/pulse", shell=True
    )

    # Start PulseAudio in system mode
    subprocess.check_output(
        "sudo pulseaudio -D --verbose --exit-idle-time=-1 --system --disallow-exit", shell=True
    )

    # Create virtual sink for output
    subprocess.check_output(
        'sudo pactl load-module module-null-sink sink_name=MeetingOutput sink_properties=device.description="Virtual_Meeting_Output"',
        shell=True,
    )

    # Create virtual sink for microphone
    subprocess.check_output(
        'sudo pactl load-module module-null-sink sink_name=MicOutput sink_properties=device.description="Virtual_Microphone_Output"',
        shell=True,
    )

    # Create virtual microphone
    subprocess.check_output(
        "sudo pactl load-module module-virtual-source source_name=VirtualMic",
        shell=True,
    )

    # Set default devices
    subprocess.check_output("sudo pactl set-default-source MeetingOutput.monitor", shell=True)
    subprocess.check_output("sudo pactl set-default-sink MeetingOutput", shell=True)

    # Create loopback to route audio between virtual devices
    subprocess.check_output(
        "sudo pactl load-module module-loopback latency_msec=1 source=MeetingOutput.monitor sink=MicOutput",
        shell=True,
    )

    options = uc.ChromeOptions()

    options.add_argument("--use-fake-ui-for-media-stream")
    options.add_argument("--window-size=1920x1080")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-setuid-sandbox")
    # options.add_argument('--headless=new')
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-application-cache")
    options.add_argument("--disable-setuid-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    log_path = "chromedriver.log"

    driver = uc.Chrome(service_log_path=log_path, use_subprocess=False, options=options)

    driver.set_window_size(1920, 1080)

    email = os.getenv("GMAIL_USER_EMAIL", "")
    password = os.getenv("GMAIL_USER_PASSWORD", "")
    gladia_api_key = (os.getenv("GLADIA_API_KEY", ""),)

    if email == "" or password == "":
        print("No email or password specified")
        return

    if gladia_api_key == "":
        print("No Gladia API key specified")
        print("Create one for free at https://app.gladia.io/")
        return

    print("Google Sign in")
    await google_sign_in(email, password, driver)

    driver.get(meet_link)

    driver.execute_cdp_cmd(
        "Browser.grantPermissions",
        {
            "origin": meet_link,
            "permissions": [
                "geolocation",
                "audioCapture",
                "displayCapture",
                "videoCapture",
                "videoCapturePanTiltZoom",
            ],
        },
    )

    print("screenshot")
    driver.save_screenshot(f"screenshots/{meet_id}/initial.png")
    print("Done save initial")

    try:
        driver.find_element(
            By.XPATH,
            "/html/body/div/div[3]/div[2]/div/div/div/div/div[2]/div/div[1]/button",
        ).click()
        sleep(2)
    except:
        print("No popup")

    # disable microphone
    print("Disable microphone")

    sleep(10)
    missing_mic = False

        # Try multiple approaches to disable microphone
    try:
        # First attempt using class names commonly found in Meet
        mic_buttons = driver.find_elements(By.CSS_SELECTOR, "[aria-label*='microphone'], [aria-label*='mic'], [data-is-muted]")
        for button in mic_buttons:
            if button.is_displayed():
                button.click()
                print("Clicked microphone button using aria-label")
                sleep(2)
                break
                
        # Take screenshot to verify
        driver.save_screenshot(f"screenshots/{meet_id}/after_mic_disable.png")
    except Exception as e:
        print(f"Error disabling microphone: {str(e)}")

    sleep(2)

    driver.save_screenshot(f"screenshots/{meet_id}/disable_microphone.png")
    print("Done save microphone")

    # Replace the hard-coded XPath for camera with this more robust approach
    print("Skipping camera disable- assuming it is disabled")
    # try:
    #     print("Disable camera")
    #     # Use flexible selectors to find the camera button
    #     camera_buttons = driver.find_elements(By.CSS_SELECTOR, "[aria-label*='camera'], [aria-label*='video'], [data-is-muted]")
    #     for button in camera_buttons:
    #         if button.is_displayed():
    #             button.click()
    #             print("Clicked camera button using aria-label")
    #             sleep(2)
    #             break
        
    #     driver.save_screenshot(f"screenshots/{meet_id}/disable_camera.png")
    #     print("Done save camera")
    # except Exception as e:
    #     print(f"Error disabling camera: {str(e)}")
    #     # Continue with the script even if camera button is not found
    #     driver.save_screenshot(f"screenshots/{meet_id}/camera_error.png")
    #     print("Continuing without disabling camera")
    try:
        print("Trying to enter meeting")
        
        # Look for input field more generically - check for any input with type="text"
        try:
            # Wait a bit for the page to load completely
            sleep(5)
            # Take a screenshot to see the current state
            driver.save_screenshot(f"screenshots/{meet_id}/before_name_input.png")
            
            # Try to find the name input field using different approaches
            input_fields = driver.find_elements(By.TAG_NAME, "input")
            name_input = None
            for field in input_fields:
                if field.get_attribute("type") == "text":
                    name_input = field
                    break
                    
            if name_input:
                name_input.click()
                sleep(1)
                name_input.send_keys("ChatMate")
                sleep(1)
                driver.save_screenshot(f"screenshots/{meet_id}/name_entered.png")
                print("Name entered successfully")
            else:
                print("Could not find name input field")
        except Exception as e:
            print(f"Error entering name: {str(e)}")
            driver.save_screenshot(f"screenshots/{meet_id}/name_error.png")
        
        # Look for join/ask to join buttons generically
        try:
            sleep(2)
            # Try different methods to find the join button
            join_buttons = []
            
            # Method 1: Find buttons by role
            buttons = driver.find_elements(By.CSS_SELECTOR, "[role='button']")
            for button in buttons:
                text = button.text.lower()
                if "join" in text or "ask to join" in text:
                    join_buttons.append(button)
                    
            # Method 2: Find standard buttons
            if not join_buttons:
                buttons = driver.find_elements(By.TAG_NAME, "button")
                for button in buttons:
                    text = button.text.lower()
                    if "join" in text or "ask to join" in text:
                        join_buttons.append(button)
            
            # Try to click the first matching button
            if join_buttons:
                join_buttons[0].click()
                print("Join button clicked")
                sleep(5)
                driver.save_screenshot(f"screenshots/{meet_id}/after_join_click.png")
            else:
                print("Could not find join button")
                driver.save_screenshot(f"screenshots/{meet_id}/no_join_button.png")
                
        except Exception as e:
            print(f"Error clicking join button: {str(e)}")
            driver.save_screenshot(f"screenshots/{meet_id}/join_error.png")
            
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        # Try to continue anyway in case we're already in the meeting
        driver.save_screenshot(f"screenshots/{meet_id}/auth_error.png")

    # try every 5 seconds for a maximum of 5 minutes
    # current date and time
    now = datetime.datetime.now()
    max_time = now + datetime.timedelta(minutes=int(os.getenv("MAX_WAITING_TIME_IN_MINUTES", 5)))

    joined = False
    loop_count = 0
    max_loops = 3  # Only try 3 times before moving on

    while datetime.datetime.now() < max_time and not joined and loop_count < max_loops:
        loop_count += 1
        print(f"Join attempt {loop_count} of {max_loops}")
        
        driver.save_screenshot(f"screenshots/{meet_id}/joined_attempt_{loop_count}.png")
        print("Taking screenshot")
        sleep(2)

        try:
            # Check if already in a meeting by looking for specific elements
            meeting_indicators = [
                "//div[contains(@aria-label, 'chat with')]",
                "//div[contains(@aria-label, 'meeting')]",
                "//span[contains(text(), 'Present now')]",
                "//span[contains(text(), 'Recording')]",
                "//div[contains(@aria-label, 'Leave call')]"
            ]
            
            for indicator in meeting_indicators:
                try:
                    elements = driver.find_elements(By.XPATH, indicator)
                    if elements and any(el.is_displayed() for el in elements):
                        print(f"Found meeting indicator: {indicator}")
                        joined = True
                        break
                except Exception as e:
                    print(f"Error checking indicator {indicator}: {str(e)}")
            
            if joined:
                print("We appear to be in the meeting already!")
                break
                
            # Try to dismiss any popups
            try:
                # Look for dismiss buttons, "Got it", "Skip", etc.
                dismiss_buttons = driver.find_elements(By.TAG_NAME, "button")
                for button in dismiss_buttons:
                    try:
                        text = button.text.lower()
                        if any(word in text for word in ["dismiss", "got it", "skip", "close", "no thanks"]):
                            button.click()
                            print(f"Clicked dismiss button: {text}")
                            sleep(1)
                    except:
                        pass
            except:
                pass

            # If we're not already in a meeting, try to click expand options
            print("Try to click expand options")
            more_options_found = False
            
            # Try different methods to find the more options button
            # Method 1: By aria-label
            try:
                options_elements = driver.find_elements(By.CSS_SELECTOR, "[aria-label*='options']")
                for element in options_elements:
                    if element.is_displayed():
                        element.click()
                        print("Clicked more options button")
                        more_options_found = True
                        sleep(2)
                        break
            except Exception as e:
                print(f"Error finding options by aria-label: {str(e)}")
                
            # Method 2: By role and text content
            if not more_options_found:
                try:
                    buttons = driver.find_elements(By.CSS_SELECTOR, "[role='button']")
                    for button in buttons:
                        try:
                            if "more" in button.text.lower() or "option" in button.text.lower():
                                button.click()
                                print("Clicked options by text content")
                                more_options_found = True
                                sleep(2)
                                break
                        except:
                            pass
                except Exception as e:
                    print(f"Error finding options by role: {str(e)}")
                    
            driver.save_screenshot(f"screenshots/{meet_id}/after_options_attempt_{loop_count}.png")
            
            # If we found and clicked more options, look for fullscreen
            if more_options_found:
                print("Try to move to full screen")
                try:
                    # Look for any menu items with "fullscreen" text
                    menu_items = driver.find_elements(By.CSS_SELECTOR, "li, div[role='menuitem']")
                    for item in menu_items:
                        try:
                            text = item.text.lower()
                            if "fullscreen" in text or "full screen" in text:
                                item.click()
                                print("Clicked fullscreen option")
                                joined = True
                                break
                            elif "minimize" in text or "exit fullscreen" in text:
                                print("Already in fullscreen")
                                joined = True
                                break
                        except:
                            pass
                except Exception as e:
                    print(f"Error finding fullscreen option: {str(e)}")
                    
            driver.save_screenshot(f"screenshots/{meet_id}/after_fullscreen_attempt_{loop_count}.png")
            
            # If neither worked, try join button again as a fallback
            if not joined and not more_options_found:
                try:
                    print("Trying to find join button again...")
                    join_buttons = driver.find_elements(By.TAG_NAME, "button")
                    for button in join_buttons:
                        try:
                            text = button.text.lower()
                            if "join" in text or "ask" in text:
                                button.click()
                                print(f"Clicked button with text: {text}")
                                sleep(2)
                                joined = True
                                break
                        except:
                            pass
                except Exception as e:
                    print(f"Error finding join button again: {str(e)}")
        
        except Exception as e:
            print(f"Error in join attempt {loop_count}: {str(e)}")
            
        print(f"End of join attempt {loop_count}")

    # Force joined status to true after max attempts to proceed with recording
    if not joined:
        print("Could not confirm joining meeting after maximum attempts. Proceeding with recording anyway.")
        joined = True

    # Save final state
    driver.save_screenshot(f"screenshots/{meet_id}/final_state_before_recording.png")
    print("Starting recording regardless of join status")


    duration = os.getenv("DURATION_IN_MINUTES", 15)
    duration = int(duration) * 60

    print("Start recording")
    record_command = f"ffmpeg -y -video_size 1920x1080 -framerate 30 -f x11grab -i :99 -f pulse -i MeetingOutput.monitor -af 'highpass=f=200,lowpass=f=3000' -t {duration} -c:v libx264 -pix_fmt yuv420p -c:a aac -strict experimental recordings/{meet_id}/output.mp4"

    await asyncio.gather(
        run_command_async(record_command),
    )

    print("Done recording")
    print("Transcribing using Gladia")

    file_path = f"recordings/{meet_id}/output.mp4"  # Change with your file path

    if os.path.exists(file_path):  # This is here to check if the file exists
        print("- File exists")
    else:
        print("- File does not exist")

    file_name, file_extension = os.path.splitext(
        file_path
    )  # Get your audio file name + extension

    if str(os.getenv("DIARIZATION")).lower() in [
        "true",
        "t",
        "1",
        "yes",
        "y",
        "oui",
        "o",
    ]:
        diarization = True
    else:
        diarization = False

    with open(file_path, "rb") as f:  # Open the file
        file_content = f.read()  # Read the content of the file

    headers = {
        "x-gladia-key": os.getenv("GLADIA_API_KEY", ""),
        "accept": "application/json",
    }

    files = [("audio", (file_path, file_content, "video/" + file_extension[1:]))]

    # print("- Uploading file to Gladia...")
    # upload_response = make_request(
    #     "https://api.gladia.io/v2/upload/", headers, "POST", files=files
    # )
    # print("Upload response with File ID:", upload_response)
    # audio_url = upload_response.get("audio_url")

    # data = {
    #     "audio_url": audio_url,
    #     "diarization": diarization,
    # }

    # headers["Content-Type"] = "application/json"

    # print("- Sending request to Gladia API...")
    # post_response = make_request(
    #     "https://api.gladia.io/v2/pre-recorded/", headers, "POST", data=data
    # )

    # print("Post response with Transcription ID:", post_response)
    # result_url = post_response.get("result_url")

    # if result_url:
    #     while True:
    #         print("Polling for results...")
    #         poll_response = make_request(result_url, headers)

    #         if poll_response.get("status") == "done":
    #             file_path = "recordings/transcript.json"
    #             print("- Transcription done | recording results to {file_path}")
    #             # save the json response to recordings folder as transcript.json
    #             with open(file_path, "w") as f:
    #                 json.dump(poll_response, f, indent=2)
    #             break
    #         elif poll_response.get("status") == "error":
    #             file_path = "recordings/error.json"
    #             print("- Transcription failed | recording results to {file_path}")
    #             with open(file_path, "w") as f:
    #                 json.dump(poll_response, f, indent=2)
    #         else:
    #             print("Transcription status:", poll_response.get("status"))
    #         sleep(1)

    print("- End of work")


if __name__ == "__main__":
    click.echo("starting google meet recorder...")
    asyncio.run(join_meet())
    click.echo("finished recording google meet.")
