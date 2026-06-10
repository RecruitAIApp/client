import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import { API_BASE_URL } from "../../config/api.config";
import { useApplicationStore } from "../../store/applicationStore";

const SOCKET_URL = API_BASE_URL.replace("/api", "");

const NotificationListener = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { addNotification, fetchNotifications } = useNotificationStore();
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Connect to socket
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      // Join user room
      socketRef.current.emit("join", user._id);

      // Listen for notifications
      socketRef.current.on("notification", (notification) => {
        addNotification(notification);
        
        // Show detailed notification message to candidate
        const toastMsg = notification.type === "application_status" 
          ? notification.message 
          : (notification.title || "New Notification");

        toast.info(toastMsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Invalidate and refetch candidate applications in real-time
        if (notification.type === "application_status") {
          useApplicationStore.getState().fetchCandidateApplications();
        }
      });

      // Fetch initial notifications
      fetchNotifications();

      return () => {
        if (socketRef.current) {
          socketRef.current.off("notification");
          socketRef.current.disconnect();
        }
      };
    }
  }, [isAuthenticated, user, addNotification, fetchNotifications]);

  return null;
};

export default NotificationListener;
