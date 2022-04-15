import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ContentHeader, Grid } from '../components';
import cloneDeep from 'clone-deep';
const { getBookmarks, readCategory, createBookmark, deleteBookmark } = api;

const CategoriesContainer = styled.div`
  padding: 56px 5% 56px 5%;
  position: relative;
`;

const SkeletonContainer = styled(Skeleton)``;

const CategoriesLandingPage = (props) => {
  async function getCategoryData() {
    await readCategory('categories')
      .then((res) => {
        const { data = {} } = res;
        setApiData(data);
      })
      .catch((err) => {
        setApiError(err);
      });
  }
  async function getBookmarkData() {
    await getBookmarks()
      .then((res) => {
        const { data = [] } = res?.data;
        setBookmarkData(data);
      })
      .catch((err) => {
        setBookmarkError(bookmarkError);
      });
  }

  async function sendCreateBookmark(body) {
    await createBookmark(body)
      .then((res) => {
        const { data = {} } = res?.data;
        // tbd handle this within the bookmark component itself instead so that we do not cause re-renders by passing bookmarks down through children
        const newBookmarkData = cloneDeep(bookmarkData);
        newBookmarkData.push(data);
        setBookmarkData(newBookmarkData);
      })
      .catch((err) => {
        // tbd better error handling
        window.alert(JSON.stringify(err));
      });
  }

  async function sendDeleteBookmark(id) {
    await deleteBookmark(id)
      .then((res) => {
        // tbd handle this within the bookmark component itself instead so that we do not cause re-renders by passing bookmarks down through children
        const newBookmarkData = cloneDeep(bookmarkData).filter(
          (bookmark) => parseInt(bookmark?.attributes?.content_id) !== parseInt(id)
        );
        setBookmarkData(newBookmarkData);
      })
      .catch((err) => {
        // tbd better error handling
        window.alert(JSON.stringify(err));
      });
  }
  const [apiData, setApiData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [bookmarkError, setBookmarkError] = useState(null);

  useEffect(() => {
    getCategoryData();
    getBookmarkData();
  }, []);

  const doneLoading = (apiData || apiError) && (bookmarkData || bookmarkError);
  return (
    <CategoriesContainer>
      {doneLoading ? (
        apiError ? (
          <div>Error from API: {JSON.stringify(apiError)}</div>
        ) : (
          <div>
            <ContentHeader attributes={apiData?.data?.attributes} />
            {/* TBD - to get this page to match the design, the grid would need to be hardcoded. something like:
              const pageSections = getPageSectionsFromIncludedArray(page_sections?.data, included);
              custom code to handle pageSections[0]
              then use the already built grid for pageSections.slice(1, pageSections.length)
            */}
            <Grid
              attributes={apiData?.data?.attributes}
              relationships={apiData?.data?.relationships}
              included={apiData?.included}
              createBookmark={sendCreateBookmark}
              deleteBookmark={sendDeleteBookmark}
              bookmarks={bookmarkData}
            />
          </div>
        )
      ) : (
        <SkeletonContainer count={20} />
      )}
    </CategoriesContainer>
  );
};

export default CategoriesLandingPage;
