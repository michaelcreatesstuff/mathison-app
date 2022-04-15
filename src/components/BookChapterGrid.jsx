import React from 'react';
import styled from 'styled-components';
import { ReactComponent as bookmark } from '../assets/bookmark.svg';
import { isBookmarked } from '../helpers/helpers';

const GridContainer = styled.div`
  position: relative;
  overflow-y: display;
`;

const BookChapterGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BookChapterCard = styled.div`
  flex-basis: 25%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 2%;
  margin: 2%;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookChapterHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BookChapterIdentifier = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const Bookmark = styled(bookmark)`
  cursor: pointer;
  & path {
    fill: ${(props) => (props.bookmarked === 'true' ? '#000000' : 'none')};
  }: 
`;

const BookChapterBody = styled.div`
  margin-bottom: 12px;
`;

const BookChapterTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.1px;
  margin-bottom: 12px;
`;

const BookChapterSnippet = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.5px;
`;

const BookChapterCTA = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0.1px;
  color: #000000;
`;

const BookChapterGrid = (props) => {
  const {
    bookChapters = [],
    createBookmark = () => {},
    deleteBookmark = () => {},
    bookmarks = [],
  } = props;
  return (
    <GridContainer>
      {bookChapters.length > 0 ? (
        <>
          {bookChapters.map((book) => {
            return (
              <BookChapterGridContainer key={book?.bookId}>
                {book?.chapters?.map((chapter) => {
                  const bookmarked = isBookmarked('book_chapter', chapter?.id, bookmarks);
                  return (
                    <BookChapterCard key={chapter?.id}>
                      <BookChapterBody>
                        <BookChapterHeading>
                          <BookChapterIdentifier>
                            {chapter?.attributes?.identifier}
                          </BookChapterIdentifier>
                          <Bookmark
                            onClick={
                              bookmarked
                                ? () => deleteBookmark(chapter?.id)
                                : () =>
                                    createBookmark({
                                      content_type: 'book_chapter',
                                      content_id: chapter?.id,
                                    })
                            }
                            bookmarked={bookmarked ? 'true' : undefined}
                          />
                        </BookChapterHeading>
                        <BookChapterTitle>{chapter?.attributes?.title}</BookChapterTitle>
                        <BookChapterSnippet>{chapter?.attributes?.snippet}</BookChapterSnippet>
                      </BookChapterBody>
                      <BookChapterCTA>
                        {`Read ${chapter?.attributes?.identifier?.toLowerCase()}`}
                      </BookChapterCTA>
                    </BookChapterCard>
                  );
                })}
              </BookChapterGridContainer>
            );
          })}
        </>
      ) : null}
    </GridContainer>
  );
};

export default BookChapterGrid;
