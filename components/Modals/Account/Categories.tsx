import ApplicationLogo from "@/components/ApplicationLogo"
import Modal from "../Modal"
import Button from "@/components/Button"
import { useLazyInitCsrfQuery } from "@/lib/redux/apis/endpoints/auth"
import { useGetAllCategoriesQuery, useGetUserCategoriesQuery, useUpdateUserCategoriesMutation } from "@/lib/redux/apis/endpoints/categories"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hide } from "@/lib/redux/slices/preferenceModalSlice"
import { RootState } from "@/lib/redux/store"
import { useGetUserQuery } from "@/lib/redux/apis/endpoints/account"
import { showLogin } from "@/lib/redux/slices/authModalSlice"

const Categories = () => {

  const [csrf] = useLazyInitCsrfQuery()

  const { data: categories, isLoading: gettingCategories } = useGetAllCategoriesQuery()
  const { data: user_categories, isLoading: gettingUserCategories } = useGetUserCategoriesQuery()
  const { data: user, isError } = useGetUserQuery()
  
  const [updateUserCategories, { isLoading }] = useUpdateUserCategoriesMutation()

  const dispatch = useDispatch()
  const openModal = useSelector((state: RootState) => state.preferencesModal)
  const requestClose = () => dispatch(hide())

  const [selectedCategories, setSelectedCategories] = useState<number[]>();

  const handleSelect = (category: any) => {
    const categoryId = category.id;
    const isSelected = selectedCategories?.includes(categoryId);

    if (isSelected) {
      // Category already selected, remove it from the array
      setSelectedCategories((prevCategories) => prevCategories?.filter((id) => id !== categoryId));
    } else {
      // Category not selected, add it to the array
      // @ts-ignore
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
    }
  };

  useEffect(() => {
    setSelectedCategories(user_categories?.map((category) => category.id))
  }, [user_categories])

  useEffect(() => {
    if ((!user || isError) && openModal != "hide") dispatch(showLogin())
  }, [user, openModal, isError])

  const handleSubmit = async () => {
    if (!selectedCategories) return;

    await csrf()

    await updateUserCategories(selectedCategories)
      .then(() => {
        // TODO: Show Success

        // Close Modal
        requestClose()
      })
  }

  return (
    <Modal open={user && (openModal == 'category')} >
      <Modal.Content useClose className={'py-12 w-md-80'} requestClose={requestClose}>
        <ApplicationLogo />

        <h5 className="pt-2">Stay in your space</h5>
        <p>What interests you?</p>

        <div className="py-2">
          <div className="flex wrap">
            {/* TODO: Show Loading State */}
            {categories?.map(category =>
              <div className="col-12 col-md-4" key={category.id}>
                <div className="categoryCard">
                  <button onClick={() => handleSelect(category)}>
                    <h5>{category.name}</h5>
                    <p>{category.description}</p>
                  </button>
                  {selectedCategories?.includes(category.id) && <div className="markCheck">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-selected</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
                  </div>}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="pt-4 pt-md-2 flex align-center">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="auth-btn"
            processing={isLoading || gettingCategories || gettingUserCategories}>
            Save Preference
          </Button>

          <Button
            onClick={requestClose}
            className="underline"
            processing={isLoading}>
            Close
          </Button>
        </div>

      </Modal.Content>
    </Modal>
  )
}

export default Categories