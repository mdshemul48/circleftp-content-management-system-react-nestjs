import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Form, Row } from "react-bootstrap";

import Categories from "./Categories/Categories";

import styles from "./AddNewPost.module.css";
import PosterImage from "./PosterImage/PosterImage";
import Movie from "./Movie/Movie";
import Series from "./SeriesAndParts/Series";
import Parts from "./SeriesAndParts/Parts";

const AddNewPost = () => {
  const [publishOption, setPublishOption] = useState("singleVideo");
  const defaultFormValue = {
    title: "",
    image: null,
    previewImage: null,
    categories: [],
    content: [],
  };
  const [postDetail, setPostDetail] = useState(defaultFormValue);

  useEffect(() => {
    setPostDetail(defaultFormValue);
  }, [publishOption]);

  const onChangeHandler = (event) => {
    setPublishOption(event.target.value);
  };

  const onImageChangeHandler = (event) => {
    const file = event.target.files[0];
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPostDetail({
        ...postDetail,
        image: file,
        previewImage: reader.result,
      });
    };
  };

  return (
    <main className="m-2 p-3">
      <section>
        <h4>Add New Post</h4>
        <Form>
          <Row>
            <Col lg={6} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" type="text" />
              </Form.Group>
            </Col>
            <Col lg={4} md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" />
              </Form.Group>
            </Col>
            <Col lg={2} md={4} className="align-items-end d-flex">
              {" "}
              <Form.Group className="mb-3 w-100">
                <Form.Select className={styles.selectPublishType} onChange={onChangeHandler}>
                  <option value="singleVideo">Single Video</option>
                  <option value="multiVideo">Multi Video</option>
                  <option value="singleFile">Single File</option>
                  <option value="multiFile">Multi File</option>
                  <option value="series">Series</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              {publishOption === "singleVideo" && <Movie />}
              {publishOption === "series" && (
                <Series
                  content={postDetail.content}
                  setContent={(newContent) => setPostDetail({ ...postDetail, content: newContent })}
                />
              )}
              {publishOption !== "singleVideo" && publishOption !== "series" && (
                <Parts postDetail={postDetail} setPostDetail={setPostDetail} />
              )}
            </Col>
            <Col lg={2}>
              <Categories
                selectedCategories={postDetail.categories}
                setSelectedCategories={(newCategories) => setPostDetail({ ...postDetail, categories: newCategories })}
              />
              <PosterImage onImageChangeHandler={onImageChangeHandler} image={postDetail.previewImage} />
              <Card className="p-1 mt-2">
                {" "}
                <ButtonGroup className="w-100">
                  <Button variant="secondary">Back</Button> <Button variant="primary">Submit</Button>
                </ButtonGroup>
              </Card>
            </Col>
          </Row>
        </Form>
      </section>
    </main>
  );
};
export default AddNewPost;
