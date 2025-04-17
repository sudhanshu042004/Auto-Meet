import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Inc.",
    botName: "MeetBot",
  });

  const [notifications, setNotifications] = useState({
    meetingStarts: true,
    transcriptReady: true,
    summaryReady: true,
    actionItems: true,
    emailUpdates: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6 p-6 rounded-lg shadow-lg">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="bot">Bot Settings</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white bg-blue-500 hover:bg-gray-200 hover:text-black">
  Upload photo
</Button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input 
                      id="company" 
                      value={userProfile.company}
                      onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
              <Button 
              variant="outline" 
              size="sm" 
              className="text-white bg-blue-500 hover:bg-gray-500 hover:text-black">Save Changes
</Button>

              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
            <Button 
            variant="outline" 
            size="sm" 
            className="text-white bg-blue-500 hover:bg-gray-200 hover:text-black">
            Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Meeting Start Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when the bot joins a meeting
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.meetingStarts}
                    onCheckedChange={(checked) => setNotifications({...notifications, meetingStarts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Transcript Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a meeting transcript is ready
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.transcriptReady}
                    onCheckedChange={(checked) => setNotifications({...notifications, transcriptReady: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Summary Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a meeting summary is ready
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.summaryReady}
                    onCheckedChange={(checked) => setNotifications({...notifications, summaryReady: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Action Item Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about action items from meetings
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.actionItems}
                    onCheckedChange={(checked) => setNotifications({...notifications, actionItems: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly email summaries of all meeting activities
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailUpdates: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Bot Settings Tab */}
        <TabsContent value="bot" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bot Settings</CardTitle>
              <CardDescription>Configure how the meeting bot appears and behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Bot Display Name</Label>
                <Input 
                  id="bot-name" 
                  value={userProfile.botName}
                  onChange={(e) => setUserProfile({...userProfile, botName: e.target.value})}
                />
                <p className="text-sm text-muted-foreground">
                  This name will appear in meetings when the bot joins
                </p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-4">Bot Integration Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Google Meet Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable the bot to join Google Meet meetings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Zoom Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable the bot to join Zoom meetings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Microsoft Teams Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable the bot to join Microsoft Teams meetings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                toast({
                  title: "Bot settings updated",
                  description: "Your bot settings have been saved successfully.",
                });
              }}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
