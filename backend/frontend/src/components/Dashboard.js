import React, { useEffect, useState } from "react";
import { fetchCustomerMetrics } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Grid } from "@mui/material";

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCustomerMetrics();
      setMetrics(data);
    };
    getData();
  }, []);

  const totalRevenue = metrics.reduce((acc, m) => acc + m.total_spent, 0);
  const totalOrders = metrics.reduce((acc, m) => acc + m.total_orders, 0);
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const metricsWithRecency = metrics.map(c => ({
    ...c,
    days_since_last_purchase: c.last_purchase_date
      ? Math.floor((new Date() - new Date(c.last_purchase_date)) / (1000 * 3600 * 24))
      : 0
  }));

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Customer Intelligence Dashboard</Typography>

      {/* KPIs */}
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h5">₹{totalRevenue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h5">{totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h5">₹{avgOrderValue}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Revenue by Customer</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_spent" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Orders by Customer</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_orders" fill="#ff5722" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recency Chart */}
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6">Customer Recency (Days Since Last Purchase)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metricsWithRecency}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="customer_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="days_since_last_purchase" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Table */}
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>Top Customers</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Total Spent</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Last Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map(c => (
              <TableRow key={c.customer_id}>
                <TableCell>{c.customer_id}</TableCell>
                <TableCell>₹{c.total_spent}</TableCell>
                <TableCell>{c.total_orders}</TableCell>
                <TableCell>{c.last_purchase_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Dashboard;
