import { useEffect, useState } from "react";
import reactDom from "react-dom";
import { fetchObject } from "./api";

function Header() {
  return (
    <header className="hero card-header">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-info">Flower Image</h1>
        </div>
      </div>
    </header>
  );
}

function Video(props) {
  return (
    <section className="section">
      <video preload="auto" width="500px" height="280px" src={props.src} controls loop />
    </section >
  );
}

function Number(props) {
  return (
    <p>{props.src}</p>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="Flower Image" />
        </figure>
      </div>
    </div>

  );
}

function Text(props) {
  return (
    <div>
      <p>{props.src}</p>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  var clean = urls.filter(Boolean);
  return (
    <div className="columns is-vcentered is-multiline">

      {clean.map((url) => {
        return (
          <div key={url} >

            {
              !function () {
                if (url == []) {
                  return null;
                }
              }
            }

            < Video src={url.video} />
          </div>
        );
      })}

      {clean.map((url) => {
        return (
          <div key={url} className="column is-3">

            <Number src={url.number} />
            <Image src={url.image} />

          </div>
        );
      })}

    </div>
  );
}

/* function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
 
      {urls.map((url) => {
        return (
          <div key={url} >
 
            {
              !function () {
                if (url == []) {
                  return null;
                }
              }
            }
 
            < Video src={url.video} />
          </div>
        );
      })}
 
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
 
            <Number src={url.number} />
            <Image src={url.image} />
 
          </div>
        );
      })}
 
    </div>
  );
} */

function TextGallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div>

      {urls.map((url) => {
        return (
          <div key={url}>
            <Text src={url.text} />
          </div>
        );
      })}

    </div >
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { flower } = event.target.elements;
    props.onFormSubmit(flower.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="flower" defaultValue="sakura">
                <option value="sakura">sakura</option>
                <option value="sumire">sumire</option>
                <option value="tutuji">tutuji</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div >
  );
}

function Main() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchObject("sakura").then((objURLs) => {
      setUrls(objURLs);
      /*  objURLs.map(obj => {
         setUrls(urls => ([
           ...urls,
           {
             video: obj.video,
             number: obj.number,
             img: obj.image,
             text: obj.text
           }
         ]));
       });*/
    });
  }, []);

  function reloadObject(flower) {
    fetchObject(flower).then((objURLs) => {
      setUrls(objURLs);
      /* objURLs.map((obj) => {
        urls.push({ obj: obj });
      });
      setUrls(urls); */
    });
    /* setUrls(urls); */
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadObject} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
          <TextGallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>My Flower Image Gallery</p>
        <p>
          <a href="https://example.com">Home Page</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
