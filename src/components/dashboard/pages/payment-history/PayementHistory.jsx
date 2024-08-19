import React from "react";
import "./payement-history.css";
import { Icon } from "@iconify/react";
import userService from "../../../../services/api/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../loader/Loader";

const PayementHistory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["individual-courses-enrolled"],
    queryFn: () => userService.getMyPayments(),
  });

  console.log(data?.payments);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading courses. Please try again later.</p>;

  return (
    <div className="payment-history">
      <h2 style={{ color: "#18181B", fontSize: "24px" }}>Payment History</h2>
      <p>
        You can browse through all payments made on this platform over time.
      </p>
      <div className="search-filter-sort">
        <input
          style={{ backgroundColor: "rgba(94, 45, 189, 0.05)" }}
          type="text"
          placeholder="Search by time, date, order ID or Payment Type"
        />
        <div className="filters">
          <button>
            <span>
              <Icon icon="octicon:filter-16" />
            </span>
            <select style={{ cursor: "pointer" }}>
              <option value="all">Filter by</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </button>
          <button>
            <span>
              <Icon icon="mingcute:az-sort-ascending-letters-line" />
            </span>
            <select style={{ cursor: "pointer" }}>
              <option value="a-z">Sort by A-Z</option>
              <option value="z-a">Sort by Z-A</option>
            </select>
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.payments?.map((payment, index) => (
            <tr key={payment.reference}>
              <td>{index + 1}</td>
              <td>{payment.reference}</td>
              <td>{((payment.paymentDetails.amount)/1000).toLocaleString()}</td>
              <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              <td>{new Date(payment.createdAt).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nav-btn">
        <p>{`1 - ${data?.payments?.length} of ${data?.payments?.length}`}</p>
        <div>
          <Icon icon="iconamoon:arrow-left-2-light" width={25} />
          <Icon icon="iconamoon:arrow-right-2-light" width={25} />
        </div>
      </div>
    </div>
  );
};

export default PayementHistory;
