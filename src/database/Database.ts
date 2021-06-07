import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './Schema';
import PhotoModel from './Photo';
// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // optional database name or file system path
  // dbName: 'myapp',
  // optional migrations
  // migrations,
  // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  // synchronous: true,
  // experimental JSI mode, a more advanced version of synchronous: true
  jsi: false,
  // Optional, but you should implement this method:
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});
// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [PhotoModel],
  actionsEnabled: true,
});
export const fetchAll = async (): Promise<Photo[]> => {
  const photosCollection = database.get('photos');
  const photos = (await photosCollection.query().fetch()) as Array<PhotoModel>;
  return photos.map((photoModel: PhotoModel) => {
    const photo = {
      id: photoModel.photo_id,
      width: photoModel.width,
      height: photoModel.height,
      url: photoModel.url,
      photographer: photoModel.photographer,
      photographer_url: photoModel.photographerUrl,
      photographer_id: photoModel.photographerId,
      avg_color: photoModel.avgColor,
      src: JSON.parse(photoModel.src),
      liked: photoModel.liked,
      keyword: photoModel.keyword,
    };
    return photo;
  });
};
export const insertAll = async (photos: Array<Photo>) => {
  const photosCollection = database.get('photos');
  await database.action(async () => {
    await database.batch(
      ...photos.map((photo: Photo) => {
        const newPhoto = photosCollection.prepareCreate(
          (photoModel: PhotoModel) => {
            photoModel.photo_id = photo.id;
            photoModel.width = photo.width;
            photoModel.height = photo.height;
            photoModel.url = photo.url;
            photoModel.photographer = photo.photographer;
            photoModel.photographerUrl = photo.photographer_url;
            photoModel.photographerId = photo.photographer_id;
            photoModel.avgColor = photo.avg_color;
            photoModel.src = JSON.stringify(photo.src);
            photoModel.liked = photo.liked;
            photoModel.keyword = photo.keyword;
          },
        );
        return newPhoto;
      }),
    );
  });
};
export const clearAll = async () => {
  const photosCollection = database.get('photos');
  const photos = await photosCollection.query().fetch();
  await database.action(async () => {
    photos.forEach(async (item: {markAsDeleted: () => any}) => {
      await item.markAsDeleted(); // syncable
      // await item.destroyPermanently(); // permanent
    });
  });
};