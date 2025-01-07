"use client";

import { Icon } from "@iconify/react";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { searchActions } from "@lib/slices/search/search.slice";
import { Chip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const GlobalSearch = () => {
  const dispatch = useAppDispatch();

  const isEnglish = useSelector((state: RootState) => state.language.isEnglish);

  const searchOverviewResults = useSelector(
    (state: RootState) => state.search.searchOverviewResponse?.serchOverView
  );

  const searchOverviewPath = useSelector(
    (state: RootState) => state.search.searchOverviewResponse?.path
  );

  const searchObjectiveResults = useSelector(
    (state: RootState) =>
      state.search.searchObjectiveResponse?.serchRabRoleOrAdviceItem
  );

  const searchObjectivePath = useSelector(
    (state: RootState) => state.search.searchObjectiveResponse?.path
  );

  const searchMobileAppFeatureResults = useSelector(
    (state: RootState) =>
      state.search.searchMobileAppFeatureResponse?.searchMobileAppFeature
  );

  const searchMobileAppFeaturePath = useSelector(
    (state: RootState) => state.search.searchObjectiveResponse?.path
  );

  const searchMemberResults = useSelector(
    (state: RootState) => state.search.searchMemberResponse?.serchMember
  );

  const searchMemberPath = useSelector(
    (state: RootState) => state.search.searchMemberResponse?.path
  );

  const searchNocResults = useSelector(
    (state: RootState) => state.search.searchNocResponse?.serchNoc
  );

  const searchNocPath = useSelector(
    (state: RootState) => state.search.searchNocResponse?.path
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term: ", searchTerm);
    try {
      dispatch(
        searchActions.searchFetch({
          request: {
            searchText: searchTerm,
          },
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleSearch = () => {
    console.log("Searching for: ", searchTerm);
    try {
      dispatch(
        searchActions.searchFetch({
          request: {
            searchText: searchTerm,
          },
        })
      );
    } catch (error) {
      console.log("Error: ", error);
    }
    console.log("Search result: ", searchOverviewResults);
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3">
        <div className="search-area">
          <input
            type="text"
            placeholder={
              isEnglish ? "Type to search..." : "অনুসন্ধান করতে লিখুন..."
            }
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div className="search-icon" onClick={handleSearch}>
            <Icon icon="ion:search" width="18px" height="18px" />
          </div>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              maxHeight: "150px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#403B3B",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {searchOverviewResults &&
              searchOverviewResults.length > 0 &&
              searchOverviewResults.map((result: any, index) => (
                <div>
                  <Chip
                    key={index}
                    label={searchTerm}
                    component="a"
                    href={searchOverviewPath}
                    clickable
                    rel="noopener noreferrer"
                    style={{
                      margin: "5px",
                      maxWidth: "calc(100% - 10px)",
                      fontSize: "12px",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ))}
            {searchObjectiveResults &&
              searchObjectiveResults.length > 0 &&
              searchObjectiveResults.map((result: any, index) => (
                <div>
                  <Chip
                    key={index}
                    label={searchTerm}
                    component="a"
                    href={searchObjectivePath}
                    clickable
                    rel="noopener noreferrer"
                    style={{
                      margin: "5px 0",
                      width: "100%",
                      fontSize: "12px",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ))}
            {searchMobileAppFeatureResults &&
              searchMobileAppFeatureResults.length > 0 &&
              searchMobileAppFeatureResults.map((result: any, index) => (
                <div>
                  <Chip
                    key={index}
                    label={searchTerm}
                    component="a"
                    href={searchMobileAppFeaturePath}
                    clickable
                    rel="noopener noreferrer"
                    style={{
                      margin: "5px",
                      maxWidth: "calc(100% - 10px)",
                      fontSize: "12px",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ))}
            {searchMemberResults &&
              searchMemberResults.length > 0 &&
              searchMemberResults.map((result: any, index) => (
                <div>
                  <Chip
                    key={index}
                    label={searchTerm}
                    component="a"
                    href={searchMemberPath}
                    clickable
                    rel="noopener noreferrer"
                    style={{
                      margin: "5px",
                      maxWidth: "calc(100% - 10px)",
                      fontSize: "12px",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ))}
            {searchNocResults &&
              searchNocResults.length > 0 &&
              searchNocResults.map((result: any, index) => (
                <div>
                  <Chip
                    key={index}
                    label={searchTerm}
                    component="a"
                    href={searchNocPath}
                    clickable
                    rel="noopener noreferrer"
                    style={{
                      margin: "5px",
                      maxWidth: "calc(100% - 10px)",
                      fontSize: "12px",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="mobile-search">
          <button
            className="menu-search-toggle"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <Icon icon="ion:search" width="22px" height="22px" />
          </button>
          <div
            className="offcanvas offcanvas-top "
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel"
          >
            <div className="offcanvas-header d-flex justify-content-end">
              <button
                type="button"
                className="mobile-btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Icon icon="iconoir:cancel" width="30px" height="30px" />
              </button>
            </div>
            <div className="offcanvas-body">
              <div className="mobile-search-area">
                <input type="text" placeholder="অনুসন্ধান করতে লিখুন..." />
                <div className="search-icon">
                  <Icon icon="ion:search" width="18px" height="18px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="language-dropdown">
          <select className="form-select" aria-label="Default select example">
            <option selected value="1">
              বাংলা
            </option>
            <option value="2">ENG</option>
          </select>
        </div> */}
      </div>
    </>
  );
};

export default GlobalSearch;
