import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class PhotoModel extends Model {
  static table = 'photos';

  @field('photo_id') photo_id: number;
  @field('width') width: number;
  @field('height') height: number;
  @field('url') url: string;
  @field('photographer') photographer: string;
  @field('photographer_url') photographerUrl: string;
  @field('photographer_id') photographerId: number;
  @field('avg_color') avgColor: string;
  @field('src') src: string;
  @field('liked') liked: boolean;
  @field('keyword') keyword: string;
}
