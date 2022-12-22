import { Routes, Route } from "react-router-dom";
import Events from "./Pages/Events";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CanList from "./Pages/Personal/CanList";
import MyEvents from "./Pages/Personal/MyEvents";
import MyRequests from "./Pages/Personal/MyRequests";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import SoloEvent from "./Pages/SubComp/SoloEvent";

export default function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={
                <PrivateRoute>
                    <Events />
                </PrivateRoute>
            } />
            <Route path="/:id" element={<SoloEvent />} />
            <Route path="/myevents" element={
                <PrivateRoute>
                    <MyEvents />
                </PrivateRoute>
            } />
            <Route path="/myevents/:id" element={
                <PrivateRoute>
                    <CanList />
                </PrivateRoute>
            } />
            <Route path="/myrequests" element={
                <PrivateRoute>
                    <MyRequests />
                </PrivateRoute>
            } />
        </Routes>
    )
}