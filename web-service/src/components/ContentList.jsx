import ContentCard from "./ContentCard.jsx";
import '../assets/css/ContentList.css';
import {useLocation} from "react-router-dom";
import {Container} from "react-bootstrap";

function ContentList(props) {

    const location = useLocation();
    const contents = location?.state?.transformedContents || [];
    const isMovie = location?.state?.isMovie || false;
    const isSeries = location?.state?.isSeries || false

    const contentCards = contents.map((content) => {
        return <ContentCard key={content.id}
                            content={content}
                            selectContent={props.selectContent}
                            isMovie={isMovie}
                            isSeries={isSeries}/>
    });

    return (<Container>
        <ul className="content-list mt-5">
            {contentCards}
        </ul>
    </Container>)
}

export default ContentList;
