import { Cards } from "components/common/Cards/Cards";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCards, getUserCardsById } from "store/redux/slices/cardsSlice";

export const UserPage = () => {
    const allCards = useSelector(getCards);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getUserCardsById(id));
    }, [id]);
  return (
    
    <div>
      <DashboardLayout userPage={true}>
        <Cards allCards={allCards} adminPage={false} />
      </DashboardLayout>
    </div>
  );
};
