import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { ResponsiveContainer } from 'recharts'

const ChatbotCharts = ({ dataLine, dataPie }) => {
  const colors = ['#0F8390', '#FFBB28', '#FF8042', '#0088FE'];

  return (
    <div className="row justify-content-center">
      {/* Bar Chart */}
      <div className="col-md-6 d-flex flex-column align-items-center">
        <h5 className="text-center fw-bold mb-3">Pertanyaan per Hari</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataLine} margin={{ bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="tanggal"
              angle={-30}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="jumlah" fill="#0F8390" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="col-md-6 d-flex flex-column align-items-center">
        <h5 className="text-center fw-bold mb-3">Kategori Terbanyak</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataPie}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default ChatbotCharts;
