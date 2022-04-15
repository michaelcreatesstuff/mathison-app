import React from 'react';
import styled from 'styled-components';
import { ReactComponent as bookmark } from '../assets/bookmark.svg';
import { ReactComponent as rightarrow } from '../assets/rightarrow.svg';
import { isBookmarked } from '../helpers/helpers';

const GridContainer = styled.div`
  position: relative;
  overflow-y: display;
`;

const PageSectionsGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 64px;
`;

const PageSectionContainer = styled.div``;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.2px;
  color: #000000;
  margin: 2%;
`;

const PageSectionCard = styled.div`
  flex-basis: 41%;
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

const PageSectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageSectionHeadingWrapper = styled.div`
  display: flex;
`;

const PageSectionContentType = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const PageSectionDuration = styled.div`
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

const RightArrow = styled(rightarrow)`
  cursor: pointer;
`;

const PageSectionBody = styled.div`
  margin-bottom: 12px;
`;

const PageSectionTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.1px;
  margin-bottom: 12px;
`;

const PageSectionSnippet = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.5px;
`;

const PageSectionFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageSectionCTA = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0.1px;
  color: #000000;
`;

const PageSectionTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SectionTag = styled.div`
  background: #f3f3f3;
  border-radius: 100px;
  padding: 8px 16px;
  margin-right: 8px;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.1px;
  color: #000000;
`;

const ContentTypeTag = styled.div`
  background: ${(props) => (props.background ? props.background : '#f3f3f3')};
  border-radius: 100px;
  padding: 8px 16px;
  margin-right: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #000000;
`;

const PageSectionTags = (props) => {
  const { tags = [] } = props;
  return (
    <PageSectionTagsContainer>
      {tags?.length > 0
        ? tags.map((tag) => <SectionTag key={tag?.name}>{tag?.name}</SectionTag>)
        : null}
    </PageSectionTagsContainer>
  );
};

const getContentTypeTag = (type) => {
  let background;
  switch (type) {
    case 'interview':
      background = 'rgba(255, 213, 0, 0.9)';
      break;
    case 'how_to':
      background = 'rgba(254, 70, 38, 0.5)';
      break;
    case 'book':
      background = 'rgba(128, 11, 138, 0.5)';
      break;
    case 'toolkit':
      background = 'rgba(5, 176, 178, 0.5)';
      break;
    case 'event':
      background = 'rgba(46, 130, 227, 0.4)';
      break;
    case 'case_study':
      background = '#D9E740';
      break;
    case 'video':
      background = 'rgba(99, 61, 253, 0.5)';
      break;
    default:
      background = '#F3F3F3';
      break;
  }
  return <ContentTypeTag background={background}>{type.replace(/_/g, ' ')}</ContentTypeTag>;
};

const PageSectionsGrid = (props) => {
  const {
    pageSections = [],
    createBookmark = () => {},
    deleteBookmark = () => {},
    bookmarks = [],
  } = props;
  return (
    <GridContainer>
      {pageSections?.length > 0 ? (
        <PageSectionContainer>
          {pageSections?.map((section) => {
            const contents = section?.attributes?.contents;
            return (
              <div key={section?.sectionId}>
                {section?.title ? <SectionTitle>{section?.title}</SectionTitle> : null}
                <PageSectionsGridContainer>
                  {contents?.map((item) => {
                    const bookmarked = isBookmarked(item?.content_type, item?.id, bookmarks);
                    return (
                      <PageSectionCard key={item?.id}>
                        <PageSectionBody>
                          <PageSectionHeading>
                            <PageSectionHeadingWrapper>
                              <PageSectionContentType>
                                {getContentTypeTag(item?.content_type)}
                              </PageSectionContentType>
                              <PageSectionDuration>{item?.duration}</PageSectionDuration>
                            </PageSectionHeadingWrapper>
                            <Bookmark
                              onClick={
                                bookmarked
                                  ? () => deleteBookmark(item?.id)
                                  : () =>
                                      createBookmark({
                                        content_type: item?.content_type,
                                        content_id: item?.id,
                                      })
                              }
                              bookmarked={bookmarked ? 'true' : undefined}
                            />
                          </PageSectionHeading>
                          <PageSectionTitle>{item?.title}</PageSectionTitle>
                          <PageSectionSnippet>{item?.snippet}</PageSectionSnippet>
                        </PageSectionBody>
                        <PageSectionFooter>
                          <PageSectionTags tags={item?.tags} />
                          {/* TBD add link from API, update API to send link */}
                          <PageSectionCTA>
                            Read more <RightArrow />
                          </PageSectionCTA>
                        </PageSectionFooter>
                      </PageSectionCard>
                    );
                  })}
                </PageSectionsGridContainer>
              </div>
            );
          })}
        </PageSectionContainer>
      ) : null}
    </GridContainer>
  );
};

export default PageSectionsGrid;
