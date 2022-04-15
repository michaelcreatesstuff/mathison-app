import React from 'react';
import styled from 'styled-components';
import {
  getBookChaptersFromIncludedArray,
  getPageSectionsFromIncludedArray,
} from '../helpers/helpers';
import { BookChapterGrid, PageSectionsGrid } from './index';

const GridContainer = styled.div`
  position: relative;
  overflow-y: display;
`;

const Grid = (props) => {
  const {
    attributes = {},
    relationships = {},
    included = [],
    createBookmark = () => {},
    deleteBookmark = () => {},
    bookmarks = [],
  } = props;
  const { page_sections = {}, books = {} } = relationships;
  const bookChapters = getBookChaptersFromIncludedArray(books?.data, included);
  const pageSections = getPageSectionsFromIncludedArray(page_sections?.data, included);
  return (
    <GridContainer>
      {bookChapters?.length > 0 ? (
        <BookChapterGrid
          bookChapters={bookChapters}
          createBookmark={createBookmark}
          deleteBookmark={deleteBookmark}
          bookmarks={bookmarks}
        />
      ) : null}
      {pageSections?.length > 0 ? (
        <PageSectionsGrid
          pageSections={pageSections}
          createBookmark={createBookmark}
          deleteBookmark={deleteBookmark}
          bookmarks={bookmarks}
        />
      ) : null}
    </GridContainer>
  );
};

export default Grid;
