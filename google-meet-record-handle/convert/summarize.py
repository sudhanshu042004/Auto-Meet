from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os

def summarize_transcript(transcript_path, output_path, api_key):
    """
    Summarize a transcript using LangChain with Gemini and generate meeting highlights.
    
    Args:
        transcript_path (str): Path to the transcript file
        output_path (str): Path where the summary will be saved
        api_key (str): Gemini API key
    
    Returns:
        str: Path to the summary file if successful, None if failed
    """
    try:
        # Initialize Gemini model through LangChain
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=api_key,
            temperature=0.3
        )
        
        # Read transcript
        with open(transcript_path, 'r') as f:
            transcript = f.read()
        
        # Create summary prompt template
        summary_template = """
        Please provide a concise and well-structured summary of the following meeting transcript:
        
        {transcript}
        
        Focus on:
        1. Main topics discussed
        2. Key decisions made
        3. Action items assigned
        4. Important deadlines or follow-ups
        
        Format the summary in clear sections with appropriate headings.
        """
        
        # Create highlights prompt template
        highlights_template = """
        Extract the most important points from this meeting transcript:
        
        {transcript}
        
        Please provide:
        1. Key decisions (bullet points)
        2. Action items with owners (bullet points)
        3. Important deadlines (bullet points)
        4. Critical discussion points (bullet points)
        
        Format each section clearly with appropriate headings.
        """
        
        # Create chains
        summary_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate.from_template(summary_template)
        )
        
        highlights_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate.from_template(highlights_template)
        )
        
        # Generate summary and highlights
        summary_result = summary_chain.run(transcript=transcript)
        highlights_result = highlights_chain.run(transcript=transcript)
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Write summary and highlights to file
        with open(output_path, 'w') as f:
            f.write("=== MEETING SUMMARY ===\n\n")
            f.write(summary_result)
            f.write("\n\n=== KEY HIGHLIGHTS ===\n\n")
            f.write(highlights_result)
        
        print(f"Summary saved to {output_path}")
        return output_path
        
    except Exception as e:
        print(f"Error during summarization: {str(e)}")
        return None

if __name__ == "__main__":
    # Example usage
    transcript_path = "/path/to/transcript.txt"
    output_path = "/path/to/summary.txt"
    api_key = "your-api-key-here"
    summarize_transcript(transcript_path, output_path, api_key) 