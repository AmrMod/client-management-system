import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Bell } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "@/api/notificationapi";



const NotificationUI = ({notifications}) => {

    const queryClient = useQueryClient();

    const markAsReadMutation = useMutation({
        mutationFn: markNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            });
        }
    });

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            markAsReadMutation.mutate(notification.id);
        }
    };

   
        
        

     





    

  
    return (
        
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Notifications</h1>
              <p className="text-muted-foreground mt-1">Keep track of alerts, replies, and billing updates.</p>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                <div>
                  <CardTitle>System Notifications</CardTitle>
                  <CardDescription>Stay updated with activities in your workspace.</CardDescription>
                </div>
                
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No notifications to display.</div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-4 flex items-start gap-4 transition hover:bg-muted/10 cursor-pointer ${
                            !n.read ? "bg-primary/5 border-l-2 border-primary" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm text-foreground">{n.title}</p>
                            <span className="text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
    );
};

export default NotificationUI;