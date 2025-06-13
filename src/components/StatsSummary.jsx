import React from "react";

const StatSummary = ({ totalQuestions, totalFiles, totalIndexedQA }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      <div className="col">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h5 className="card-title">Total Pertanyaan Yang Masuk</h5>
            <p className="card-text fs-3">{totalQuestions}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h5 className="card-title">File Base Knowledge</h5>
            <p className="card-text fs-3">{totalFiles}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h5 className="card-title">QA Terindeks</h5>
            <p className="card-text fs-3">{totalIndexedQA}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatSummary;