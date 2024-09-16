import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import "./school-overview.css";
import ActiveStudentsModal from "../../../modals-pages/dashboard-modals/overview/ActiveStudentsModal";
import NonActiveStudentsModal from "../../../modals-pages/dashboard-modals/overview/NonActiveStudentsModal";
import ActiveTeachersModal from "../../../modals-pages/dashboard-modals/overview/ActiveTeachersModal";
import NonActiveTeachersModal from "../../../modals-pages/dashboard-modals/overview/NonActiveTeachersModal";
import schoolService from "../../../../services/api/school";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#17E383", "#652AC433", "#FF8042", "#0088FE"];
const BAR_COLORS = ["#4bc0c0", "#9966ff", "#ff9f40", "#4b4b4b", "#ff9f40"];
const GENDER_COLORS = ["#6f6af8", "#fd46d5"]; // New array for gender chart colors

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={10} // Reduced font size
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SchoolOverview = () => {
  const [isActiveStudentModalOpen, setIsActiveStudentModalOpen] =
    useState(false);
  const [isActiveTeacherModalOpen, setIsActiveTeacherModalOpen] =
    useState(false);
  const [isNonActiveTeacherModalOpen, setIsNonActiveTeacherModalOpen] =
    useState(false);
  const [isNonActiveStudentModalOpen, setIsNonActiveStudentModalOpen] =
    useState(false);

  const [totalSudents, setTotalStudents] = useState(0);
  const [totalMales, setTotalMales] = useState(0);
  const [totalFemales, setTotalFemales] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  const [totalActive, setTotalActive] = useState(0);
  const [totalNonActive, setTotalNonActive] = useState(0);

  // Functions to open modals
  const openActiveStudentModal = () => setIsActiveStudentModalOpen(true);
  const openActiveTeacherModal = () => setIsActiveTeacherModalOpen(true);
  const openNonActiveTeacherModal = () => setIsNonActiveTeacherModalOpen(true);
  const openNonActiveStudentModal = () => setIsNonActiveStudentModalOpen(true);

  // Functions to close modals
  const closeActiveStudentModal = () => setIsActiveStudentModalOpen(false);
  const closeActiveTeacherModal = () => setIsActiveTeacherModalOpen(false);
  const closeNonActiveTeacherModal = () =>
    setIsNonActiveTeacherModalOpen(false);
  const closeNonActiveStudentModal = () =>
    setIsNonActiveStudentModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["school-dashboard"],
    queryFn: async () => schoolService.getGraphData(),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  console.log(data)
  useEffect(() => {
    if (data) {
      setTotalStudents(data?.totalStudents || 0);
      setTotalMales(data?.totalMales || 0);
      setTotalFemales(data?.totalFemales || 0);
      setTotalTeachers(data?.totalTeachers || 0);
      setTotalActive(data?.active || 0);
      setTotalNonActive(data?.notActive || 0);
      setTotalAmount(data?.totalAmount || 0);
      setTotalCompleted(data?.completed || 0);
      setTotalRemaining(data?.remaining || 0);
    }
  }, [data]);


  const dataGender = [
    { name: "Male", value: totalMales },
    { name: "Female", value: totalFemales }
  ];

  console.log(totalActive);

  const dataActive = [
    { name: "Active", value: totalActive },
    { name: "Not Active", value: totalNonActive }
  ];

  const dataEnrollment = data?.dataEnrollment || [];

  const dataCompletion = [
    { name: "Completed", value: totalCompleted },
    { name: "Remaining", value: totalRemaining }
  ];
  return (
    <div className="overview">
      <div className="top-cards">
        <div style={{ height: "130px" }} className="balance">
          <p>Account Balance:</p>
          <h6
            style={{ fontFamily: "Poppins", fontWeight: "600" }}
            className="value"
          >
            NGN {totalAmount.toLocaleString()}
          </h6>
          <p id="play">
            Pay Now <span style={{ fontSize: "18px" }}>+</span>{" "}
          </p>
        </div>

        <div style={{ height: "130px" }} className="stat one">
          <p className="enroll">Total Enrolled Teachers</p>
          <h6
            style={{ fontFamily: "Poppins", fontWeight: "600" }}
            className="value"
          >
            {totalTeachers}
          </h6>
        </div>
        <div style={{ height: "130px" }} class="stat">
          <p className="total">Total Enrolled Students</p>
          <h6
            style={{ fontFamily: "Poppins", fontWeight: "600" }}
            className="value"
          >
            {totalSudents}
          </h6>
        </div>
      </div>
      <hr />
      <div className="charts">
        <div
          className="chart"
          style={{ cursor: "pointer" }}
          onClick={openActiveStudentModal}
        >
          <div>
            <div className="chart-heading">
              <p>Activity Report</p>
              <div style={{ cursor: "pointer" }} className="filter-sort">
                <span>
                  <Icon icon="octicon:filter-16" />
                </span>
                <select style={{ cursor: "pointer" }}>
                  <option value="all">Filter by</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <hr />

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataActive}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {dataActive.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="students-dash">students</div>
            <div className="summary">
              <div className="summary-box">
                <p className="active">Active/Not-Active</p>
                <div>
                  <div className="box"></div> Active - {totalActive}
                </div>
                <div>
                  <div className="box-2"></div> Not-Active - {totalNonActive}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="chart"
          style={{ cursor: "pointer" }}
          // onClick={openNonActiveStudentModal}
        >
          <div>
            <div className="chart-heading">
              <p>Progress Report</p>
              <div style={{ cursor: "pointer" }} className="filter-sort ">
                <span>
                  <Icon icon="octicon:filter-16" />
                </span>
                <select style={{ cursor: "pointer" }}>
                  <option value="all">Filter by</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <hr />
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataCompletion}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80} // Adjusted innerRadius for increased thickness
                  outerRadius={120} // Adjusted outerRadius for increased thickness
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {dataCompletion.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="students-dash">students</div>
            <div className="summary">
              <div className="summary-box">
                <p className="active">Completion Rate</p>
                <div>
                  <div className="box"></div> Completed -{totalCompleted}
                </div>
                <div>
                  <div className="box-2"></div> Remaining - {totalRemaining}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="charts">
        <div
          className="chart two"
          style={{ cursor: "pointer" }}
          // onClick={openActiveTeacherModal}
        >
          <div>
            <div>
              <div className="chart-heading">
                <p>Gender Balance</p>
                <div style={{ cursor: "pointer" }} className="filter-sort ms-2">
                  <span>
                    <Icon icon="octicon:filter-16" />
                  </span>
                  <select style={{ cursor: "pointer" }}>
                    <option value="all">Filter by</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <hr />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataGender}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {dataGender.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={GENDER_COLORS[index % GENDER_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="students-dash">students</div>
            <div className="summary">
              <div className="summary-box">
                <p className="active gender">Gender</p>
                <div>
                  <div className="box male"></div> Male -{" "}
                  <span className="male"> {totalMales}</span>
                </div>
                <div>
                  <div className="box-2 female"></div> Female -{" "}
                  <span className="female"> {totalFemales}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart bar-chart">
          <div
            style={{ cursor: "pointer" }}
            // onClick={openNonActiveTeacherModal}
          >
            <div className="chart-heading">
              <p>Enrollment Per Course</p>
              <div style={{ cursor: "pointer" }} className="filter-sort ms-2">
                <span>
                  <Icon icon="octicon:filter-16" />
                </span>
                <select style={{ cursor: "pointer" }}>
                  <option value="all">Filter by</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
            <hr />
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={dataEnrollment}
                margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis domain={[10, "auto"]} />

                <Bar dataKey="value" barSize={60}>
                  {dataEnrollment.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ActiveStudentsModal
        isOpen={isActiveStudentModalOpen}
        close={closeActiveStudentModal}
      />
      <ActiveTeachersModal
        isOpen={isActiveTeacherModalOpen}
        close={closeActiveTeacherModal}
      />
      <NonActiveStudentsModal
        isOpen={isNonActiveStudentModalOpen}
        close={closeNonActiveStudentModal}
      />
      <NonActiveTeachersModal
        isOpen={isNonActiveTeacherModalOpen}
        close={closeNonActiveTeacherModal}
      />
    </div>
  );
};

export default SchoolOverview;
