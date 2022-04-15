import React from 'react';
import styled from 'styled-components';
import { getBookCommentsFromIncludedArray } from '../helpers/helpers';
import bookImage from '../assets/bookImage.png';
import arthurWoods from '../assets/arthur-woods.png';
import susannaTharakan from '../assets/susanna-tharakan.png';

const CategoryPageSubHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000000;
  overflow-y: visible;
  margin-bottom: 56px;
`;

const BlurbContainer = styled.div`
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.7px;
  color: #000000;
`;

const BookFlexbox = styled.div`
  display: flex;
`;
const BookFlexboxLeft = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5%;
`;
const BookFlexboxRight = styled.div`
  display: flex;
`;

const CommentContainer = styled.div`
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1px;
`;

const Comment = styled.div`
  margin-bottom: 18px;
`;
const Commenter = styled.div`
  font-weight: 700;
`;
const CommenterTitle = styled.div`
  font-weight: 700;
`;

const BookImage = styled.img``;

const BuyBookLink = styled.a`
  margin-top: 56px;
  background: #000000;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  text-align: center;
  width: 272px;
  height: 56px;
`;

const BuyBookButton = styled.button`
  margin-top: 56px;
  background: #000000;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  text-align: center;
  width: 272px;
  height: 56px;
`;

const Divider = styled.hr`
  border: 1px solid #000000;
  width: 100%;
`;

const MeetAuthorText = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  display: flex;
  align-items: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const AuthorFlexbox = styled.div`
  display: flex;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #000000;
  margin-bottom: 40px;
`;
const AuthorImage = styled.img`
  display: block;
  max-width: 125px;
  max-height: 125px;
  width: auto;
  height: auto;
  margin-right: 12px;
`;

const AuthorText = styled.div``;
const AuthorName = styled.div`
  font-weight: 700;
`;
const AuthorBio = styled.div``;

const BookComments = (props) => {
  const { includedBooks } = props;
  return (
    <CommentContainer>
      {includedBooks?.map((book) => {
        return (
          <div key={book?.bookId}>
            {book?.comments?.map((comment) => {
              // Should come from api
              const bookLink =
                'https://www.amazon.com/Hiring-Diversity-Inclusive-Equitable-Organization/dp/1119800900';
              return (
                <div key={comment?.attributes?.comment}>
                  {/* Placeholder but ideally this should come from the api */}
                  <BookImage src={bookImage} />
                  <Comment>{comment?.attributes?.comment}</Comment>
                  <Commenter>{comment?.attributes?.commenter}</Commenter>
                  <CommenterTitle>{comment?.attributes?.commenter_title}</CommenterTitle>
                  <BuyBookLink href={bookLink}>
                    <BuyBookButton>Buy the book</BuyBookButton>
                  </BuyBookLink>
                </div>
              );
            })}
          </div>
        );
      })}
    </CommentContainer>
  );
};

const CategoryPageSubHeader = (props) => {
  const { attributes = {}, books = {}, included = [] } = props;

  const includedBooks = getBookCommentsFromIncludedArray(books?.data, included);

  return (
    <CategoryPageSubHeaderContainer>
      {includedBooks.length > 0 ? (
        <BookFlexbox>
          <BookFlexboxLeft>
            <BlurbContainer>{attributes?.intro}</BlurbContainer>
            <Divider />
            {/* Should be api driven but is hardcoded */}
            <MeetAuthorText>Meet the Authors</MeetAuthorText>
            <AuthorFlexbox>
              <AuthorImage src={arthurWoods} />
              <AuthorText>
                <AuthorName>Arthur Woods</AuthorName>
                <AuthorBio>
                  Co-founder of Mathison, LGBTQ+ leader, social entrepreneur in equity technology,
                  World Economic Forum Global Shaper
                </AuthorBio>
              </AuthorText>
            </AuthorFlexbox>
            <AuthorFlexbox>
              <AuthorImage src={susannaTharakan} />
              <AuthorText>
                <AuthorName>Susanna Tharakan</AuthorName>
                <AuthorBio>
                  Head of Diversity at Sisense, DEI researcher and practitioner in industrial,
                  organizational psychology
                </AuthorBio>
              </AuthorText>
            </AuthorFlexbox>
          </BookFlexboxLeft>
          <BookFlexboxRight>
            <BookComments includedBooks={includedBooks} />
          </BookFlexboxRight>
        </BookFlexbox>
      ) : (
        <BlurbContainer>{attributes?.intro}</BlurbContainer>
      )}
    </CategoryPageSubHeaderContainer>
  );
};

export default CategoryPageSubHeader;
