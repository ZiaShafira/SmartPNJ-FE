import React from "react";
import { BsFolder2Open, BsQuestionCircle, BsSearch, BsPeople } from "react-icons/bs";

const QuickActions = ({ onAction }) => {
  const actions = [
    { icon: <BsFolder2Open />, label: "Base Knowledge", action: "base" },
    { icon: <BsQuestionCircle />, label: "FAQ", action: "faq" },
    { icon: <BsSearch />, label: "History", action: "history" },
    { icon: <BsPeople />, label: "Manage Admin", action: "admin" },
  ];

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center my-4">
      {actions.map(({ icon, label, action}) => {

        return (
          <button
            key={action}
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => onAction(action)}
          >
            {icon} {label}
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;