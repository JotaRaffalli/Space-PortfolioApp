import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "./loader";
import Emoji from "./Emoji";

const QUERY_IMAGEN_DEL_DIA = gql`
  query LaunchesQuery {
    apod {
      copyright
      date
      title
      url
      hdurl
      explanation
    }
  }
`;
const PicOfDay = props => {
  return (
    <Fragment>
      <Query asyncMode query={QUERY_IMAGEN_DEL_DIA}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Fragment>
                <di className="row d-sm-none d-md-block">
                  <div
                    style={{ width: 500 }}
                    className="card mb-4 shadow-sm mx-auto"
                  >
                    <div className="card-header">NASA Picture of the Day</div>
                    <div className="card-body">
                      <Loader />
                    </div>
                  </div>
                </di>
              </Fragment>
            );
          if (error) console.log(error);
          if (data) {
            console.log("Esta es la imagen del dia", data);
            const {
              copyright,
              date,
              title,
              url,
              hdurl,
              explanation
            } = data.apod;
            return (
              <Fragment>
                <div id="APOD" style={{  }} className="card mb-4 shadow-sm">
                  <div className="card-header"><strong className="text-ligth">NASA Astronomy Picture of the Day</strong></div>
                  <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <div className="row">
                      <div className="col-md">
                        <img
                          className="card-img-top mb-2"
                          src={url}
                          alt={title}
                        />
                        <p className="card-text">
                          <strong>
                            <i className="fas fa-play" /> Photo by{" "}
                          </strong>{" "}
                          : {copyright}
                          <br />
                          <strong>
                            <i className="fas fa-compact-disc" /> Date{" "}
                          </strong>{" "}
                          : {date}
                        </p>
                      </div>{" "}
                      <div class="col-md">
                        <h5>
                          Description
                        </h5>
                        <div>
                          <p className=" text-justify text-muted">{explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          } else {
            return (
              <Fragment>
                <div className="row">
                  <div
                    style={{ width: 550 }}
                    className="card mb-4 shadow-sm mx-auto"
                  >
                    <div className="card-header">NASA Picture of the Day</div>
                    <div className="card-body">
                      <h4 className="card-text">
                        Whoops! It seems there is no picture for today{" "}
                        <Emoji symbol="😟" />
                      </h4>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }
        }}
      </Query>
    </Fragment>
  );
};

export default PicOfDay;
