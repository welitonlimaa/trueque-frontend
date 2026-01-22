import { ListingResponseDTO } from '../../types/api';
import ListingCard from './ListingCard';
import { ListingCardMedia } from './ListingCardMedia';
import { ListingCardInfo } from './ListingCardInfo';

type Props = {
  items: ListingResponseDTO[];
  onSelect?: (id: string) => void;
  selectedId?: string;
  renderFooter?: (listing: ListingResponseDTO) => React.ReactNode;
};

export default function ListingGrid({
  items,
  onSelect,
  selectedId,
  renderFooter,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((listing) => {
        const isSelected = selectedId === listing.id;

        const Wrapper = onSelect ? 'button' : 'div';

        return (
          <Wrapper
            key={listing.id}
            onClick={() => onSelect?.(listing.id)}
            className={`text-left ${
              isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
          >
            <ListingCard>
              <ListingCardMedia
                src={listing.images?.[0]}
                alt={listing.title}
              />

              <div className="flex-1">
                <ListingCardInfo listing={listing} />
                {renderFooter?.(listing)}
              </div>
            </ListingCard>
          </Wrapper>
        );
      })}
    </div>
  );
}