import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { getUserCardsById, getCards } from "store/redux/slices/cardsSlice";
import { Cards } from "components/common/Cards/Cards";
import { getAuthUser } from "store/redux/slices/usersSlice";

export const Profile = () => {
  const allCards = useSelector(getCards);
  const auth = useSelector(getAuthUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCardsById(auth.id));
  }, []);
  return (
    <div>
      <DashboardLayout userPage>
        <Cards allCards={allCards} adminPage/>
      </DashboardLayout>
    </div>
  );
};
