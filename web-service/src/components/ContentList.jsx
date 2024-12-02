import ContentCard from "./ContentCard.jsx";
import '../assets/css/ContentList.css';
import {useLocation} from "react-router-dom";
import {Container} from "react-bootstrap";
import {useEffect} from "react";

function ContentList(props) {

    const location = useLocation();
    const contents = location?.state?.transformedContents || [];
    const isMovie = location?.state?.isMovie || false;
    const isSeries = location?.state?.isSeries || false


    useEffect(() => {
        console.log("ContentList contents:", contents);
    }, [contents, isMovie, isSeries]);

    const contentCards = contents.map((content) => {
        return <ContentCard key={content.id}
                            content={content}
                            selectContent={props.selectContent}
                            isMovie={isMovie}
                            isSeries={isSeries}/>
    });

    return (<Container>
        <h1>Resultados</h1>
        <ul className="content-list">
            {contentCards}
        </ul>
    </Container>)
}

export default ContentList;
