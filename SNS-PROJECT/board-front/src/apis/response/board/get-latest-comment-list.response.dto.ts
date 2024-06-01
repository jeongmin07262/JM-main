import { CommentListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetLatestCommentListResponseDto extends ResponseDto {
    LatestCommentList: CommentListItem[];
}