import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cloneDeep from 'clone-deep';
import api from '../api';
import Skeleton from 'react-loading-skeleton';
import { ContentHeader, CategoryPageSubHeader, Grid } from '../components';
const { getBookmarks, readCategory, createBookmark, deleteBookmark } = api;

const CategoryPageContainer = styled.div`
  position: relative;
`;

const CategoryPageContent = styled.div`
  overflow-y: visible;
`;

const SkeletonContainer = styled(Skeleton)``;

const CategoryPage = (props) => {
  async function getCategoryData(id) {
    await readCategory(id)
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

  const { id } = props;
  const [apiData, setApiData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [bookmarkError, setBookmarkError] = useState(null);
  const [routeId, setRouteId] = useState(id);

  // fire once on first render
  useEffect(() => {
    getCategoryData(id);
    if (!bookmarkData) {
      getBookmarkData();
    }
  }, []);

  // fire once every time we change route to cause a re-render of component and reload of data
  useEffect(() => {
    if (routeId !== id) {
      setRouteId(id);
      getCategoryData(id);
      getBookmarkData();
    }
  }, [id]);

  const doneLoading = (apiData || apiError) && (bookmarkData || bookmarkError);
  return (
    <CategoryPageContainer>
      {doneLoading ? (
        apiError ? (
          <div>Error from API: {JSON.stringify(apiError)}</div>
        ) : (
          <CategoryPageContent>
            <ContentHeader attributes={apiData?.data?.attributes} />
            <CategoryPageSubHeader
              attributes={apiData?.data?.attributes}
              books={apiData?.data?.relationships?.books}
              included={apiData?.included}
            />
            <Grid
              attributes={apiData?.data?.attributes}
              relationships={apiData?.data?.relationships}
              included={apiData?.included}
              createBookmark={sendCreateBookmark}
              deleteBookmark={sendDeleteBookmark}
              bookmarks={bookmarkData}
            />
          </CategoryPageContent>
        )
      ) : (
        <SkeletonContainer count={20} />
      )}
    </CategoryPageContainer>
  );
};

export default CategoryPage;
