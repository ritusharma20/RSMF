import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "../styles/stories.css";

const StoriesPage = () => {

  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stories/all")
      .then(res => res.json())
      .then(data => {
        console.log(data); // debug
        setStories(data.stories || []);
      });
  }, []);

  return (
    <Layout>
      <section className="ngo-stories">
        <div className="ngo-container">

          <div className="ngo-title">
            <h5>
              Every life touched by our initiatives reflects hope and transformation.
            </h5>
          </div>

          {/* 🔥 DATA YAHA SHOW HOGA */}
          {stories.map((story, index) => (
            <div
              className={`ngo-story-wrapper ${index % 2 !== 0 ? "reverse" : ""}`}
              key={story._id}
            >

              <div className="ngo-card ngo-image-card">
                <img
                  src={`http://localhost:5000/uploads/stories/${story.image}`}
                  alt=""
                />
              </div>

              <div className="ngo-card">
                <div className="ngo-content-card">
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>
    </Layout>
  );
};

export default StoriesPage;