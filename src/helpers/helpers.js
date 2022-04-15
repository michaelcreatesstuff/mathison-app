import cloneDeep from 'clone-deep';

const getBooksFromIncludedArray = (books, included) => {
  const booksArrayCopy = cloneDeep(books);
  return booksArrayCopy?.map((item) => included.find((element) => element?.type === 'book'));
};

const getSectionsFromIncludedArray = (page_sections, included) => {
  const sectionsArrayCopy = cloneDeep(page_sections);
  return sectionsArrayCopy?.map((item) => {
    return included.find((element) => element?.type === 'page_section' && element?.id === item?.id);
  });
};

const getFromIncludedArray = (id, type, includedArr) => {
  return includedArr?.find((element) => element?.id === id && element?.type === type);
};

export const getBookCommentsFromIncludedArray = (booksArray, includedArray) => {
  const books = getBooksFromIncludedArray(booksArray, includedArray);
  return books?.map((book) => {
    return {
      attributes: book?.attributes,
      bookId: book?.id,
      comments: book?.relationships?.book_comments?.data?.map((item) =>
        getFromIncludedArray(item?.id, item?.type, includedArray)
      ),
    };
  });
};

export const getBookChaptersFromIncludedArray = (booksArray, includedArray) => {
  const books = getBooksFromIncludedArray(booksArray, includedArray);
  return books?.map((book) => {
    const chapters = includedArray?.filter(
      (item) =>
        item?.type === 'book_chapter' &&
        parseInt(item?.attributes?.['book_id']) === parseInt(book?.id)
    );
    return {
      attributes: book?.attributes,
      bookId: book?.id,
      chapters,
    };
  });
};

export const getPageSectionsFromIncludedArray = (pageSectionsArray, includedArray) => {
  const sections = getSectionsFromIncludedArray(pageSectionsArray, includedArray);
  return sections?.map((section) => {
    return {
      title: section?.attributes?.title,
      attributes: section?.attributes,
      sectionId: section?.id,
    };
  });
};

// content type is inconsistent
const cleanUpContentType = (text) => text?.replace(/_/g, '')?.toUpperCase();

export const isBookmarked = (contentType, contentId, bookmarks = []) => {
  return (
    bookmarks?.findIndex(
      (bookmark) =>
        parseInt(bookmark?.attributes?.content_id) === parseInt(contentId) &&
        cleanUpContentType(bookmark?.attributes?.content_type) === cleanUpContentType(contentType)
    ) > -1
  );
};
