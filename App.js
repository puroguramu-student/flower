import { useEffect, useState } from "react";
import { fetchImages } from "./Image";
import { fetchText } from "./Text";
import { fetchVideo } from "./Video";

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
    <figure className="text">
      <p src={props.src} />
    </figure>
  );
}

function Video(props) {
  return (
    <div className="card">
      <div className="card-video">
        <figure className="video">
          <video src={props.src} alt="Flower video" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function ImageGallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}

function TextGallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Text src={url} />
          </div>
        );
      })}
    </div>
  );
}

function VideoGallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Video src={url} />
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
  const [imageurls, setImageurls] = useState(null);
  const [texturls, setTexturls] = useState(null);
  const [videourls, setVideourls] = useState(null);

  useEffect(() => {
    fetchImages("sakura").then((imageurls) => {
      setImageurls(imageurls);
    });
    fetchText("sakura").then((texturls) => {
      setTexturls(texturls);
    });
    fetchVideo("sakura").then((videourls) => {
      setVideourls(videourls);
    });
  }, []);

  function reloadImages(flower) {
    fetchImages(flower).then((imageurls) => {
      setImageurls(imageurls);
    });
  }

  function reloadText(flower) {
    fetchText(flower).then((texturls) => {
      setTexturls(texturls);
    });
  }

  function reloadVideo(flower) {
    fetchVideo(flower).then((videourls) => {
      setVideourls(videourls);
    });
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} onFormSubmit={reloadText} onFormSubmit={reloadVideo} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ImageGallery imageurls={imageurls} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <TextGallery texturls={texturls} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <VideoGallery videourls={videourls} />
        </div>
      </section>
    </main >
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
