
export default function Unauthorized(){
    return(
        <main>
            <div class="main-content-wrap d-flex flex-column flex-grow-1">
                <div class="row">
                    <div class="col">
                        <div class="not-found-wrap text-center">
                        <h1 class="text-60"> 404 </h1>
                        <p class="text-36 subheading mb-3">Error!</p>
                        <p class="mb-5  text-muted text-18"> Sorry! Unauthorized access. </p>
                        <a href="/" class="btn btn-lg btn-primary btn-rounded">Go back to home</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}