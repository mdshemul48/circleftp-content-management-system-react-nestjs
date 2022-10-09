import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

import axiosInstance from "../../../utility/axiosInstance";
import SeriesVideo from "./SeriesVideo/SeriesVideo";
import SingleVideo from "./SingleVideo/SingleVideo";

import styles from "./ContentPage.module.css";
import MultiVideoOrFiles from "./MultiVideoOrFiles/MultiVideoOrFiles";

function ContentPage() {
  const { contentId } = useParams();
  const [contentData, setContentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get(`/posts/${contentId}`);
      setContentData(data);
    };
    fetchData();
  }, []);

  return (
    contentData && (
      <main className="mt-5 text-center">
        <div className={`${styles.contentPage_title} py-2`}>
          <div className="d-flex align-items-center justify-content-center">
            <h2 className="text-white text-bolder">{contentData.title}</h2>
            {/* <ul className="d-flex text-light align-items-center">
              <li className="list-unstyled ms-1">{contentData.watch_time}</li>
              <li className="list-unstyled ms-1">March 17, 2019 </li>
              <li className="list-unstyled ms-1">Romantic </li>
              <li className="list-unstyled ms-1">U/A 18+ </li>
            </ul> */}
          </div>
        </div>
        <br />
        <Container>
          <Card className="p-2">
            <img
              src={`${process.env.REACT_APP_IMAGE_FOLDER_LOCATION}/${contentData.image}`}
              alt={contentData.name}
              className="w-auto"
            />
          </Card>
          {contentData.type === "singleVideo" && <SingleVideo link={contentData.content} />}
          {contentData.type === "series" && <SeriesVideo content={contentData.content} />}
          {(contentData.type === "multiVideo" || contentData.type === "multiFile") && (
            <MultiVideoOrFiles content={contentData.content} type={contentData.type} />
          )}
        </Container>
      </main>
    )
  );
}

export default ContentPage;
