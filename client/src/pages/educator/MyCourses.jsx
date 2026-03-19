import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const MyCourses = () => {

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + '/api/educator/courses',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = await getToken();
      const { data } = await axios.delete(
        backendUrl + `/api/educator/delete-course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchEducatorCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublish = async (courseId) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        backendUrl + `/api/educator/toggle-publish/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchEducatorCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) fetchEducatorCourses();
  }, [isEducator]);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start gap-6 md:p-8 p-4 pt-8">

      <h2 className="text-lg font-medium">My Courses</h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:flex flex-col items-center max-w-4xl w-full overflow-x-auto rounded-md bg-white border border-gray-500/20">
        <table className="table-auto w-full min-w-[600px]">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">All Courses</th>
              <th className="px-4 py-3 font-semibold">Earnings</th>
              <th className="px-4 py-3 font-semibold">Students</th>
              <th className="px-4 py-3 font-semibold">Published On</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-500">
            {courses.map((course) => (
              <tr key={course._id} className="border-b border-gray-500/20">

                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={course.courseThumbnail} className="w-16" />
                  <span>{course.courseTitle}</span>
                </td>

                <td className="px-4 py-3">
                  {currency} {Math.floor(
                    course.enrolledStudents.length *
                    (course.coursePrice - course.discount * course.coursePrice / 100)
                  )}
                </td>

                <td className="px-4 py-3">
                  {course.enrolledStudents.length}
                </td>

                <td className="px-4 py-3">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {course.isPublished
                    ? <span className="text-green-600">Published</span>
                    : <span className="text-gray-500">Draft</span>}
                </td>

                <td className="px-4 py-3 flex flex-col gap-2 items-center">

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={course.isPublished}
                      onChange={() => togglePublish(course._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600"></div>
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></span>
                  </label>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden flex flex-col gap-4 w-full">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded-md border shadow-sm">

            {/* Title */}
            <div className="flex items-center gap-3">
              <img src={course.courseThumbnail} className="w-14 h-14 rounded" />
              <p className="text-sm font-medium">{course.courseTitle}</p>
            </div>

            {/* Status + Toggle */}
            <div className="mt-3 flex justify-between items-center">
              <span className={course.isPublished ? "text-green-600" : "text-gray-500"}>
                {course.isPublished ? "Published" : "Draft"}
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={course.isPublished}
                  onChange={() => togglePublish(course._id)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600"></div>
                <span className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition peer-checked:translate-x-5"></span>
              </label>
            </div>

            {/* Earnings */}
            <div className="flex justify-between text-xs text-gray-500 mt-3">
              <span>
                ₹ {Math.floor(
                  course.enrolledStudents.length *
                  (course.coursePrice - course.discount * course.coursePrice / 100)
                )}
              </span>
              <span>{course.enrolledStudents.length} Students</span>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(course._id)}
              className="mt-3 w-full text-red-600 border border-red-500 py-1 rounded hover:bg-red-600 hover:text-white text-sm"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  ) : <Loading />;
};

export default MyCourses;