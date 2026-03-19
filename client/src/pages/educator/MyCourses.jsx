import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const MyCourses = () => {

  const handleDelete = async (courseId) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this course?")

    if (!confirmDelete) return

    try {

      const token = await getToken()

      const { data } = await axios.delete(
        backendUrl + `/api/educator/delete-course/${courseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchEducatorCourses()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const togglePublish = async (courseId) => {

    try {

      const token = await getToken()

      const { data } = await axios.put(
        backendUrl + `/api/educator/toggle-publish/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchEducatorCourses()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {

    try {

      const token = await getToken()

      const { data } = await axios.get(backendUrl + '/api/educator/courses', { headers: { Authorization: `Bearer ${token}` } })

      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className='w-full'>
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="hidden md:flex flex-col items-center max-w-4xl w-full overflow-x-auto rounded-md bg-white border border-gray-500/20">
          <table className="table-auto w-full min-w-[600px]">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">All Courses</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">Earnings</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">Students</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">Published On</th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img src={course.courseThumbnail} alt="Course Image" className="w-16" />
                    <span className="truncate text-xs md:text-sm hidden sm:block">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">{currency} {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{course.enrolledStudents.length}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{new Date(course.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {course.isPublished ? (
                      <span className="text-green-600 font-medium">Published</span>
                    ) : (
                      <span className="text-gray-500">Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex flex-col md:flex-row gap-2 items-center">
                    <div className="flex flex-col items-center gap-2">

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

                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>

                        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>

                      </label>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="md:hidden flex flex-col gap-4 w-full">
            {courses.map((course) => (
              <div key={course._id} className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">

                {/* Top: Image + Title */}
                <div className="flex items-center gap-3">
                  <img src={course.courseThumbnail} className="w-14 h-14 rounded" />
                  <p className="text-sm font-medium">{course.courseTitle}</p>
                </div>

                {/* Status */}
                <div className="mt-3 flex justify-between items-center">
                  <span className={`text-sm font-medium ${course.isPublished ? "text-green-600" : "text-gray-500"}`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>

                  {/* Toggle */}
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

                {/* Earnings + Students */}
                <div className="flex justify-between text-xs text-gray-500 mt-3">
                  <span>₹ {Math.floor(course.enrolledStudents.length * (course.coursePrice - course.discount * course.coursePrice / 100))}</span>
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
      </div>
    </div>
  ) : <Loading />
};

export default MyCourses;