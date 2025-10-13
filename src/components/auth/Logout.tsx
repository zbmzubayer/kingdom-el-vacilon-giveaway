import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
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
