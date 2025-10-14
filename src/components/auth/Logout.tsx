import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { removeAuthToken } from "@/lib/auth-token.util";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function Logout() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="text-destructive hover:text-destructive">
      <LogOutIcon />
      Logout
    </Button>
  );
}
