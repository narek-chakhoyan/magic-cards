import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";
import { getAdminCards, getCards } from "store/redux/slices/cardsSlice";
import { Cards } from "components/common/Cards/Cards";

export const Profile = () => {
  const allCards = useSelector(getCards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminCards());
  }, []);
  return (
    <div>
      <DashboardLayout adminPage>
        <Cards allCards={allCards} adminPage/>
      </DashboardLayout>
    </div>
  );
};
