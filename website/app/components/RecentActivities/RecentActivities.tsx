"use client";

import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { activityActions } from "@lib/slices/activity/activity.slice";
import { useSelector } from "react-redux";
import "./RecentActivities.scss";
import React, { useEffect } from "react";

const RecentActivities = () => {
  const dispatch = useAppDispatch();

  const activities = useSelector(
    (state: RootState) => state.activity.getActivityResponse?.findAllActivity
  );

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  useEffect(() => {
    dispatch(
      activityActions.getActivityFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const sortedActivities =
    activities &&
    [...activities].sort((a, b) => {
      return (
        new Date(b.acitivityDate).getTime() -
        new Date(a.acitivityDate).getTime()
      );
    });

  const latestActivities =
    sortedActivities && [...sortedActivities].slice(0, 5);

  return (
    <>
      <section className="recent-activities-area">
        <div className="container">
          <div className="d-flex align-items-left reacent-activities">
            <div className="content-title">
              {isEnglish ? "Recent Activities: " : "সাম্প্রতিক কার্যক্রম: "}
            </div>
            <div className="marquee-container">
              <div className="marquee">
                {latestActivities?.map((activity, index) => (
                  <React.Fragment key={index}>
                    {isEnglish ? activity?.headingEn : activity?.headingBn}
                    {index < activities.length - 1 && (
                      <span className="icon-separator"></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentActivities;
