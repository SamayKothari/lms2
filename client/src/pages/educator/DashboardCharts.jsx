import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = ({ courses }) => {

  const chartData = courses.map(course => ({
    name: course.courseTitle,
    students: course.enrolledStudents.length,
    revenue:
      course.enrolledStudents.length *
      (course.coursePrice - (course.discount * course.coursePrice) / 100)
  }));

  return (
    <div className="w-full grid md:grid-cols-2 gap-6 mt-8">

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Revenue per Course</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Students Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-4">Students per Course</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DashboardCharts;