export const handleFileUpdate = async (src, fieldName, handleSave) => {
  try {
    // Fetch the file from the source URL
    const response = await fetch(src);
    const data = await response.blob();

    // Get the filename and type from the URL or response
    const contentType = data.type;
    const fileName = src.split("/").pop() || "file";

    // Create a new File object with the correct name and type
    const file = new File([data], fileName, { type: contentType });

    // Update the form field with the new File object
    handleSave.setFieldValue(fieldName, file);
  } catch (error) {
    console.error("Error fetching and updating file:", error);
  }
};

export const handleSrcToFile = async (src) => {
  try {
    // Fetch the file from the source URL
    const response = await fetch(src);
    const data = await response.blob();

    // Get the filename and type from the URL or response
    const contentType = data.type;
    const fileName = src.split("/").pop() || "file";

    // Create a new File object with the correct name and type
    const file = new File([data], fileName, { type: contentType });

    // Update the form field with the new File object
    return file;
  } catch (error) {
    console.error("Error fetching and updating file:", error);
  }
};

