import { useEffect, useState } from "react";
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
      <video src={props.src} alt="Flower video" autoplay muted playsinline />
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
    <section className="section">
      <p>{props.src}</p>
    </section >
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
  return (
    <div className="columns is-vcentered is-multiline">

      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Video src={url.video} />
          </div>
        );
      })}

      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">

            <Number src={url.number} />
            <Image src={url.img} />

          </div>
        );
      })}

      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Text src={url.text} />
          </div>
        );
      })}

    </div>
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
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchObject("sakura").then((objURLs) => {
      objURLs.map(obj => {
        setUrls(url => ([
          ...url,
          {
            video: obj.video,
            img: obj.image,
            number: obj.number,
            text: obj.text
          }
        ]));
      });
    });
  }, []);

  function reloadObject(flower) {
    fetchObject(flower).then((objURLs) => {
      objURLs.map((obj) => {
        urls.push({ obj: obj });
      });
      setUrls(urls);
    });
    setUrls(urls);
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
