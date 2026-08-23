import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

 import { getMyRequests  } from "@/api/requestapi";


const MyRequests = ({ setActiveTab }) => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyRequests();

        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);


  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Requests
          </h1>

          <p className="text-muted-foreground mt-1">
            Track and manage your submitted requests.
          </p>
        </div>

        <Button onClick={() => setActiveTab("New Request")}>
          New Request
        </Button>
      </div>


      {loading && (
        <p className="text-muted-foreground">
          Loading requests...
        </p>
      )}


      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}


      {!loading && !error && (
        <Card>
          <CardContent className="p-0">
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Support Unit</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Created</TableHead>
                </TableRow>
              </TableHeader>


              <TableBody>

                {requests.map((req) => (
                  <TableRow key={req.id}>

                    <TableCell className="font-semibold">
                      {req.id}
                    </TableCell>

                    <TableCell>
                      {req.title}
                    </TableCell>

                    <TableCell>
                      {req.supportUnit?.name}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          req.priority === "HIGH" ||
                          req.priority === "URGENT"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : req.priority === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {req.priority}
                      </span>
                    </TableCell>


                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          req.status === "PENDING"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                        }`}
                      >
                        {req.status}
                      </span>
                    </TableCell>


                    <TableCell className="text-muted-foreground">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </CardContent>
        </Card>
      )}

    </div>
  );
};


export default MyRequests;