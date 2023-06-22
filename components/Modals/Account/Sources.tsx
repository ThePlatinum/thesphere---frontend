import ApplicationLogo from "@/components/ApplicationLogo"
import Modal from "../Modal"
import Button from "@/components/Button"
import { useLazyInitCsrfQuery } from "@/lib/redux/apis/endpoints/auth"
import { useGetAllSourcesQuery, useGetUserSourcesQuery, useUpdateUserSourcesMutation } from "@/lib/redux/apis/endpoints/sources"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { hide } from "@/lib/redux/slices/preferenceModalSlice"
import { RootState } from "@/lib/redux/store"
import { useGetUserQuery } from "@/lib/redux/apis/endpoints/account"

const Sources = () => {

  const [useCsrf] = useLazyInitCsrfQuery()

  const { data: sources, isLoading: gettingSources } = useGetAllSourcesQuery()
  const { data: user_sources, isLoading: gettingUserSources } = useGetUserSourcesQuery()
  const { data: user } = useGetUserQuery()
  
  const [updateUserSources, { isLoading }] = useUpdateUserSourcesMutation()

  const dispatch = useDispatch()
  const openModal = useSelector((state: RootState) => state.preferencesModal)
  const requestClose = () => dispatch(hide())

  const [selectedSources, setSelectedSources] = useState<number[]>();

  const handleSelect = (source: any) => {
    const sourceId = source.id;
    const isSelected = selectedSources?.includes(sourceId);

    if (isSelected) {
      setSelectedSources((prevSources) => prevSources?.filter((id) => id !== sourceId));
    } else {
      // @ts-ignore
      setSelectedSources((prevSources) => [...prevSources, sourceId]);
    }
  };

  useEffect(() => {
    setSelectedSources(user_sources?.map((source) => source.id))
  }, [user_sources])

  const handleSubmit = async () => {
    if (!selectedSources) return;

    await useCsrf()

    await updateUserSources(selectedSources)
      .then(() => {
        // TODO: Show Success

        // Close Modal
        requestClose()
      })
  }

  return (
    <Modal open={user && (openModal == 'source')} >
      <Modal.Content useClose className={'py-12 w-md-80'} requestClose={requestClose}>
        <ApplicationLogo />

        <h5 className="pt-2">Stay in your space</h5>
        <p>Who would you like to hear from?</p>

        <div className="py-2">
          <div className="flex wrap">
            {/* TODO: Show Loading State */}
            {sources?.map(source =>
              <div className="col-6 col-md-3" key={source.id}>
                <div className="sourceCard">
                  <button onClick={() => handleSelect(source)}>
                    <h6 className="p-0 m-0">{source.name}</h6>
                  </button>
                  {selectedSources?.includes(source.id) && <div className="markCheck">
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
            processing={isLoading || gettingSources || gettingUserSources}>
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

export default Sources