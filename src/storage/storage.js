import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 24 * 3600 * 1000, // ms- 1d
  enableCache: true,
});

export default storage;
