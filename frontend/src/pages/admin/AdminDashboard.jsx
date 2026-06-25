import { Link } from 'react-router-dom';
import { Users, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/admin/create-user">
                        <button className="w-full">
                            <Users className="h-4 w-4" />
                            Create User
                        </button>
                    </Link>

                    <Link to="/admin/users">
                        <button className="w-full">
                            <Users className="h-4 w-4" />
                            Users
                        </button>
                    </Link>

                    <Link to="/admin/projects">
                        <button className="w-full">
                            <LayoutDashboard className="h-4 w-4" />
                            Projects
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );

};

export default AdminDashboard;