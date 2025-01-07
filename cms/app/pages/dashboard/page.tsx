'use client';

import React, { use } from "react";
import BarChart from "../../components/chart/page";

const  Dashboard: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="table-title fw-bold mb-0">IP Tracking</h6>
              <select className="form-select form-select-sm w-auto table-dropdown">
                <option value="1">Today</option>
                <option value="2">Last 7 Days</option>
                <option value="3">Last 30 days</option>
              </select>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>IP Address</th>
                      <th>Location</th>
                      <th>Platform</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-justify">
                      <td>1</td>
                      <td>0.0.0.0</td>
                      <td>Bangladesh</td>
                      <td>Windows</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>2</td>
                      <td>0.0.0.0</td>
                      <td>Bangladesh</td>
                      <td>Windows</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>3</td>
                      <td>0.0.0.0</td>
                      <td>Bangladesh</td>
                      <td>Windows</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>4</td>
                      <td>0.0.0.0</td>
                      <td>Bangladesh</td>
                      <td>Windows</td>
                      <td>Chrome</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="table-title fw-bold mb-0">Admin Access List</h6>
              <select className="form-select form-select-sm w-auto table-dropdown">
                <option value="1">Today</option>
                <option value="2">Last 7 days</option>
                <option value="3">Last 30 days</option>
              </select>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Admin Name</th>
                      <th>Role</th>
                      <th>Last Login</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-justify">
                      <td>1</td>
                      <td>Admin</td>
                      <td>Super Admin</td>
                      <td>12:30 PM</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>2</td>
                      <td>Admin</td>
                      <td>Super Admin</td>
                      <td>12:30 PM</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>3</td>
                      <td>Admin</td>
                      <td>Super Admin</td>
                      <td>12:30 PM</td>
                      <td>Chrome</td>
                    </tr>
                    <tr className="text-justify">
                      <td>4</td>
                      <td>Admin</td>
                      <td>Super Admin</td>
                      <td>12:30 PM</td>
                      <td>Chrome</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="table-title fw-bold mb-0">Feedback And Support</h6>
              <select className="form-select form-select-sm w-auto table-dropdown">
                <option value="1">Today</option>
                <option value="2">Last 7 Days</option>
                <option value="3">Last 30 days</option>
              </select>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-justify">
                      <td>1</td>
                      <td>Admin</td>
                      <td>01700000000</td>
                      <td>Subject</td>
                      <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore consectetur numquam harum officiis eius corporis.</td>
                    </tr>
                    <tr className="text-justify">
                      <td>2</td>
                      <td>Admin</td>
                      <td>01700000000</td>
                      <td>Subject</td>
                      <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus dicta iure voluptatibus laborum similique praesentium.</td>
                    </tr>
                    <tr className="text-justify">
                      <td>3</td>
                      <td>Admin</td>
                      <td>01700000000</td>
                      <td>Subject</td>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam iusto commodi nihil sed ipsa et.</td>
                    </tr>
                    <tr className="text-justify">
                      <td>4</td>
                      <td>Admin</td>
                      <td>01700000000</td>
                      <td>Subject</td>
                      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam iusto commodi nihil sed ipsa et.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="table-title fw-bold mb-0">Site Visitors</h6>
              <select className="form-select form-select-sm w-auto table-dropdown">
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3" selected>Monthly</option>
              </select>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;