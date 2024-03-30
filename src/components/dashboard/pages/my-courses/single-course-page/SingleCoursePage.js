import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Icon } from '@iconify/react';
import '../course.css'
import CourseProgessionOne from "./CourseProgessionOne";

function SingleCoursePage() {


    const { id } = useParams();
    const location = useLocation();
    const course = location?.state?.course;
    const navigate = useNavigate();

    const [activeLink, setActiveLink] = React.useState("weekone");
    const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0);




    const handleLinkClick = (linkName, index) => {
        setActiveLink(linkName);
        setActiveLink(`week${index + 1}`);
        setCurrentWeekIndex(index);
    };



    const renderSidebarContent = () => {
        switch (activeLink) {
            case 'weekone':
                return <CourseProgessionOne course={course} currentWeekIndex={currentWeekIndex} /> ;
            
            default:
                return null;
        }
    };





    return (
        <div className="course-profile">


            <div className="mt-5 course-links">

                <div className="about-courses-menu mt-5">

                    <p className="back-to-course-list " onClick={() => navigate('/dashboard/my-courses')}>
                        <Icon icon="fa6-solid:arrow-left-long" className="me-2" />
                        back to course
                    </p>

                    <div className="course-title-text mt-3">
                        <h2>{course?.title}:</h2>
                        <h2 className="sub-title"> {course?.subtitle}</h2>
                    </div>
                    <ul className="sub-courses mt-2">
                        {/* <li className={activeLink === "profile" ? "active" : ""} onClick={() => handleLinkClick("profile")}>
                            <Icon icon="healthicons:ui-user-profile" />
                            {course?.catalogue.map((week, index) => (
                                <p key={index}>{week}</p>
                            ))}
                        </li> */}

                        <ul className="sub-courses mt-2">
                            {course?.catalogue?.map((week, index) => (
                                <li key={index} className={index === 0 && activeLink === "weekone" ? "active" : ""} onClick={() => handleLinkClick("profile")}>
                                    <div>
                                        <Icon icon="icon-park-outline:check-one" className="course-list-icon" />
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <p className="text-nowrap">{`Week ${index + 1} `}</p>
                                        <p className="text-wrap ms-3">{week.weekLesson}</p>
                                    </div>

                                </li>
                            ))}
                        </ul>


                    </ul>
                </div>

            </div>
            <div className="course-sidebar-content">
                {renderSidebarContent()}

            </div>

        </div>
    );
}

export default SingleCoursePage;