import { useState, useEffect } from "react";
import { getupdateUser, createUser, updateuserbyadmin } from "../../api/userapi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus } from "lucide-react";  

function EditUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();

  useEffect(() => {
          const fetchUsers = async () => {
              try {
                  const response = await getupdateUser(params.id);
                  setName(response.name);
                  setEmail(response.email);
                  setPassword(response.password);
                  setRole(response.role);
                  console.log(response);

              } catch (error) {
                  setError(error.message);
              } finally {
                  setLoading(false);
              }
          };
          fetchUsers();
      }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password  ) {
      setError("Please fill in all the fields");
      return;
    }
    if (!name.includes(" ")) {
      setError("Please enter your full name (first and last)");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const user = await updateuserbyadmin(params.id, name, email, password, role);
      console.log(user);
      alert("User successfully updated");
      navigate("/Users");
  
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {params.id}
            Client Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Edit Users
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Edit user
            </CardTitle>
            <CardDescription>
              Enter details
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>

                <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-md p-2"
                >
                <option value="CLIENT">Client</option>
                <option value="ADMIN">Admin</option>
                </select>
              </div>

            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating User..." : "Create User"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EditUsers;
