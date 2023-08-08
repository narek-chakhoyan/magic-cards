import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "components/layouts/DashboardLayout/DashboardLayout";

import { getAllUsers } from "store/redux/slices/usersSlice";
import { getAllCards, getCards } from "store/redux/slices/cardsSlice";

import { Cards } from "components/common/Cards/Cards";

export const Feed = () => {
  const dispatch = useDispatch();

  const allCards = useSelector(getCards);

  useEffect(() => {
    dispatch(getAllCards());
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <DashboardLayout adminPage={false}>
        <Cards allCards={allCards} adminPage={false} />
      </DashboardLayout>
    </div>
  );
};
