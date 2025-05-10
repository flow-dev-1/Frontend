import React from "react";
import MyCourseCard from "../../reusable/MyCourseCard";
import { Icon } from "@iconify/react";
import "./course.css";
import userService from "../../../../services/api/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../loader/Loader";
import { useState } from "react";
import courseOne from "../../../../assets/course1.png";
import courseTwo from "../../../../assets/course2.png";
import courseThree from "../../../../assets/course3.png";

const courses = [
  {
    id: 1,
    title: "Max the Explorer Monkey: Growth Mindset",
    description:
      "The curriculum combines engaging educational content, interactive activities, and reflective discussions to...",
    viewed: 1548,
    likes: 98,
    progress: 0,
    image: courseOne, // Replace with actual image path or URL
  },
  {
    id: 2,
    title: "Self-Awareness",
    description:
      "The curriculum combines engaging educational content, interactive activities, and reflective discussions to...",
    viewed: 1548,
    likes: 98,
    progress: 10,
    image: courseTwo, // Replace with actual image path or URL
  },
  {
    id: 3,
    title: "Max the Explorer Monkey: Growth Mindset",
    description:
      "The curriculum combines engaging educational content, interactive activities, and reflective discussions to...",
    viewed: 1548,
    likes: 98,
    progress: 100,
    image: courseThree, // Replace with actual image path or URL
  },
];

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState(""); // State for Search Query
  const [sortOption, setSortOption] = useState(""); // State for Sort Option
  const [filterOption, setFilterOption] = useState(""); // State for Filter Option
  const { data, isLoading, isError } = useQuery({
    queryKey: ["individual-courses-enrolled"],
    queryFn: () => userService.getIndividualCoursesEnrolled(), // Make sure to call the function
  });

  const handleSort = (a, b) => {
    if (sortOption === "az") {
      return a?.course?.title.localeCompare(b.title);
    } else if (sortOption === "za") {
      return b?.course.title.localeCompare(a.title);
    }
    return 0;
  };

  const filteredCourses = data?.courses
    ?.filter((course) => {
      const searchValue = searchQuery.toLowerCase();
      return (
        course?.course?.title?.toLowerCase().includes(searchValue) ||
        course?.course?.description?.toLowerCase().includes(searchValue) ||
        course?.course?.email?.toLowerCase().includes(searchValue) ||
        course?.phone?.course.toLowerCase().includes(searchValue)
      );
    })
    .filter((course) => {
      if (filterOption === "Individual") {
        return course?.course.access === "Individual";
      } else if (filterOption === "Educator") {
        return course?.course.access === "Educator";
      } else if (filterOption === "General") {
        return course?.course.access === "General";
      }
      return true; // Return all courses if no filter is applied
    })
    .sort(handleSort);

  if (isLoading) return <Loading />; // Render loading spinner or message
  if (isError) return <p>Error loading courses. Please try again later.</p>; // Handle error state

  return (
    <div className="w-100">
      <div className="browse-all-courses-text container-fluid">
        <p>Enrolled Courses</p>
      </div>

      <div className="search-bar">
        <form action="" className="search">
          <div className="search-wrapper">
            <span className="search-icon">
              <Icon icon="lets-icons:search" style={{ color: "#4d4d4d" }} />
            </span>
            <input
              type="text"
              id="search-input"
              placeholder="Search by Name, Age, Email, Phone Number"
              value={searchQuery} // Bind the search input to state
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
          </div>

          <div className="d-flex justify-content-between w-100">
            <div className="filter-sort">
              <label>
                <Icon
                  icon="ic:outline-sort-by-alpha"
                  style={{ color: "#4d4d4d" }}
                />
                <select
                  name="sort"
                  id="sort"
                  className="sort"
                  value={sortOption} // Bind sort option to state
                  onChange={(e) => setSortOption(e.target.value)} // Update state on sort change
                >
                  <option value="">Sort by</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </label>
            </div>

            <div className="filter-sort">
              <label>
                <Icon icon="gridicons:filter" style={{ color: "#4d4d4d" }} />
                <select
                  name="filter"
                  id="filter"
                  className="filter"
                  value={filterOption} // Bind filter option to state
                  onChange={(e) => setFilterOption(e.target.value)} // Update state on filter change
                >
                  <option value="" disabled>
                    Filter by
                  </option>
                  <option value="">All</option>
                  <option value="Individual">Students</option>
                  <option value="General">General</option>
                  <option value="Educator">Teachers</option>
                </select>
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="contianer courses-list">
        <div className="row">
          {filteredCourses?.map((course) => (
            <div className="col-12 col-md-6 col-lg-4 g-4">
              <MyCourseCard key={course._id} course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
